"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X, Plus, CheckCircle2, CornerDownLeft, Square, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/eagleai/Markdown";
import { BlockRenderer } from "@/components/eagleai/BlockRenderer";
import { LeadCapture } from "@/components/eagleai/LeadCapture";
import { RagSources, RecommendationBlock } from "@/components/eagleai/RichResponses";
import { EagleOrb } from "@/components/eagleai/EagleOrb";
import { ThinkingIndicator } from "@/components/eagleai/ThinkingIndicator";
import {
  createSession,
  getSession,
  loadSessions,
  normalizeProjectContext,
  startOfToday,
  startOfYesterday,
  titleFromMessage,
  upsertSession,
  type EagleAIBlock,
  type EagleAIMessage,
  type EagleAISession,
  type EagleAISource,
  type ProjectContext,
} from "@/lib/eagleai";

const STARTERS = [
  "Build me an ERP",
  "Show relevant projects",
  "Estimate my project",
  "What can EagleNest build?",
];

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function updateLastMessage(
  messages: EagleAIMessage[],
  updater: (message: EagleAIMessage) => EagleAIMessage
): EagleAIMessage[] {
  if (messages.length === 0) return messages;
  const copy = [...messages];
  copy[copy.length - 1] = updater(copy[copy.length - 1]);
  return copy;
}

const messageMotion = {
  hidden: { opacity: 0, y: 14, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function EagleAISessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<EagleAIMessage[]>([]);
  const [title, setTitle] = useState("New chat");
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [sessionsList, setSessionsList] = useState<EagleAISession[]>([]);
  const [projectContext, setProjectContext] = useState<ProjectContext | null>(null);
  const [showProjectPlan, setShowProjectPlan] = useState(false);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSummary, setLeadSummary] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<EagleAIMessage[]>([]);
  const createdAtRef = useRef(Date.now());
  const abortRef = useRef<AbortController | null>(null);
  const isStreamingRef = useRef(false);
  const pendingInitialRef = useRef<string | null>(null);
  const failedQueryRef = useRef<string | null>(null);

  const safeProjectContext = projectContext
    ? normalizeProjectContext(projectContext)
    : null;

  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  const initialKey = `eagleai_initial_query_${sessionId}`;

  // Load (or create) the session for this id, then auto-send any landing query.
  useEffect(() => {
    const existing = getSession(sessionId);
    const loaded = existing ?? createSession(sessionId);
    createdAtRef.current = loaded.createdAt;
    messagesRef.current = loaded.messages;
    setMessages(loaded.messages);
    setTitle(loaded.title);
    setProjectContext(null);
    setShowProjectPlan(false);
    setSessionLoaded(true);

    const initialQuery = window.sessionStorage.getItem(initialKey);
    if (initialQuery) {
      window.sessionStorage.removeItem(initialKey);
      if (loaded.messages.length === 0) {
        pendingInitialRef.current = initialQuery;
      }
    }
    setSessionsList(loadSessions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Persist the session whenever it changes (messages, title, streaming end).
  useEffect(() => {
    if (!sessionLoaded) return;
    upsertSession({
      id: sessionId,
      title,
      createdAt: createdAtRef.current,
      updatedAt: Date.now(),
      messages: messagesRef.current,
    });
    setSessionsList(loadSessions());
  }, [sessionId, sessionLoaded, title, messages]);

  // Auto-scroll to the latest message while streaming and on new messages.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const appendText = useCallback((payload: string) => {
    const text = payload.replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
    const trimmed = text.trim();

    // Backend status events arrive as *Routing query...* / *Generating response...*
    const statusMatch = trimmed.match(/^\*(?!\*)((?:Routing|Generating|Retrieving|Searching|Analyzing)\b[^*]*)\*$/);
    if (statusMatch) {
      setStatus(statusMatch[1]);
      return;
    }

    if (!trimmed) return;

    setStatus(null);
    messagesRef.current = updateLastMessage(messagesRef.current, (message) => ({
      ...message,
      content: message.content + text,
    }));
    setMessages(messagesRef.current);
  }, []);

  const handleStructured = useCallback((obj: Record<string, unknown>) => {
    const type = typeof obj.type === "string" ? obj.type : "";
    const rawData = obj.data;
    const data =
      rawData && typeof rawData === "object" && !Array.isArray(rawData)
        ? (rawData as Record<string, unknown>)
        : {};

    if (type === "project_context") {
      setProjectContext(data as unknown as ProjectContext);
      return;
    }

    if (type === "sources") {
      const items = Array.isArray(rawData)
        ? (rawData as EagleAISource[])
        : ((data.items as EagleAISource[]) ?? []);
      messagesRef.current = updateLastMessage(messagesRef.current, (message) => ({
        ...message,
        sources: items,
      }));
      setMessages(messagesRef.current);
      return;
    }

    if (type) {
      const block: EagleAIBlock = { type, data: data as EagleAIBlock["data"] };
      messagesRef.current = updateLastMessage(messagesRef.current, (message) => ({
        ...message,
        blocks: [...(message.blocks ?? []), block],
      }));
      setMessages(messagesRef.current);
    }
  }, []);

  const handlePayload = useCallback(
    (payload: string) => {
      if (payload.startsWith("{")) {
        try {
          const obj = JSON.parse(payload);
          if (obj && typeof obj === "object" && typeof obj.type === "string") {
            handleStructured(obj);
            return;
          }
        } catch {
          // Not JSON — treat as plain text.
        }
      }
      appendText(payload);
    },
    [appendText, handleStructured]
  );

  const handleSend = useCallback(
    async (e: React.FormEvent | null, initialQuery?: string) => {
      if (e) e.preventDefault();
      const text = (initialQuery ?? query).trim();
      if (!text || isStreamingRef.current) return;

      const isFirstMessage = messagesRef.current.length === 0;

      const history = messagesRef.current.map((message) => ({
        role: message.role,
        content: message.content,
      }));

      const userMessage: EagleAIMessage = { id: createId(), role: "user", content: text };
      const assistantMessage: EagleAIMessage = { id: createId(), role: "assistant", content: "" };

      messagesRef.current = [...messagesRef.current, userMessage, assistantMessage];
      setMessages(messagesRef.current);
      setQuery("");
      setStatus(null);
      setChatError(null);
      setIsStreaming(true);

      if (isFirstMessage) setTitle(titleFromMessage(text));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/eagleai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let detail = "";
          try {
            const parsed = await res.json();
            detail = parsed.error ?? "";
          } catch {
            // No JSON body.
          }
          throw new Error(detail || `Request failed with status ${res.status}`);
        }
        if (!res.body) throw new Error("ReadableStream not supported in this browser.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);
            if (!line) continue;
            if (line.startsWith("data:")) {
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              handlePayload(payload);
            }
          }
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          // Stream stopped by the user — keep whatever was already streamed.
        } else {
          console.error(error);
          failedQueryRef.current = text;
          setChatError(
            "Sorry, I encountered an error connecting to my servers. Please try again."
          );
          messagesRef.current = updateLastMessage(messagesRef.current, (message) => ({
            ...message,
            content: "Sorry, I encountered an error connecting to my servers.",
          }));
          setMessages(messagesRef.current);
        }
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
        setStatus(null);
      }
    },
    [handlePayload, query]
  );

  // Send the landing-page query once the session is ready.
  useEffect(() => {
    if (!sessionLoaded || !pendingInitialRef.current) return;
    const initialQuery = pendingInitialRef.current;
    pendingInitialRef.current = null;
    handleSend(null, initialQuery);
  }, [sessionLoaded, handleSend]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const openLead = useCallback(() => {
    setLeadSummary(
      projectContext
        ? `${projectContext.title} — ${projectContext.overview ?? (projectContext.requirements ?? []).join(", ")}`
        : ""
    );
    setLeadOpen(true);
  }, [projectContext]);

  const retryLastQuery = useCallback(() => {
    const failed = failedQueryRef.current;
    if (!failed) return;
    failedQueryRef.current = null;
    messagesRef.current = messagesRef.current.slice(
      0,
      Math.max(0, messagesRef.current.length - 2)
    );
    setMessages(messagesRef.current);
    handleSend(null, failed);
  }, [handleSend]);

  const lastMessage = messages[messages.length - 1];
  const showStatus =
    isStreaming && !!status && (lastMessage?.role === "user" || lastMessage?.content === "");

  const todaySessions = sessionsList.filter((session) => session.updatedAt >= startOfToday());
  const yesterdaySessions = sessionsList.filter(
    (session) => session.updatedAt >= startOfYesterday() && session.updatedAt < startOfToday()
  );
  const olderSessions = sessionsList.filter((session) => session.updatedAt < startOfYesterday());

  const renderSessions = (list: EagleAISession[]) => (
    <ul className="space-y-1">
      {list.map((session) => (
        <li key={session.id}>
          <button
            onClick={() => router.push(`/eagleai/session/${session.id}`)}
            className={cn(
              "group w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium truncate transition-all",
              session.id === sessionId
                ? "bg-[#5B5FFF]/[0.08] text-[#5B5FFF] shadow-[inset_3px_0_0_0_#5B5FFF]"
                : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0 transition-colors",
                  session.id === sessionId
                    ? "bg-[#5B5FFF]"
                    : "bg-[#CBD5E1] group-hover:bg-[#94A3B8]"
                )}
              />
              {session.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  const emptyState =
    messages.length === 0 && !isStreaming && sessionLoaded && !pendingInitialRef.current;

  return (
    <div className="flex h-[100dvh] pt-[80px] bg-white overflow-hidden">

      {/* Left Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-[#E3E8F5] bg-[#FAFBFF]/60 h-full">
        <div className="p-5 flex items-center justify-between border-b border-[#E3E8F5]">
          <Link href="/eagleai" className="flex items-center gap-2.5 group">
            <EagleOrb size={30} animate={false} className="group-hover:scale-105 transition-transform" />
            <span className="text-[13px] font-bold tracking-[0.1em] text-[#0F172A]">EagleAI</span>
          </Link>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#10B981] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            Online
          </span>
        </div>

        <div className="p-4">
          <Link
            href="/eagleai"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-[12px] font-semibold tracking-[0.05em] text-white hover:bg-[#1E293B] transition-colors"
          >
            <Plus size={14} /> New Chat
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
          {todaySessions.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Today</h3>
              {renderSessions(todaySessions)}
            </div>
          )}
          {yesterdaySessions.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Yesterday</h3>
              {renderSessions(yesterdaySessions)}
            </div>
          )}
          {olderSessions.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Previous</h3>
              {renderSessions(olderSessions)}
            </div>
          )}
          {sessionsList.length === 0 && (
            <p className="text-[12px] text-[#94A3B8] px-3 py-2">No conversations yet.</p>
          )}
        </div>
      </aside>

      {/* Main Conversation Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#E3E8F5] bg-white z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-[#475569] hover:text-[#0F172A]"
            aria-label="Open conversations"
          >
            <Menu size={20} />
          </button>

          {projectContext ? (
            <button
              onClick={() => setMobileContextOpen(true)}
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] text-[#5B5FFF] bg-[#5B5FFF]/[0.08] px-3 py-1.5 rounded-full"
            >
              PROJECT CONTEXT <span className="text-[14px] leading-none mb-[1px]">↑</span>
            </button>
          ) : (
            <span className="text-[12px] font-bold tracking-[0.1em] text-[#0F172A] max-w-[50%] truncate">{title}</span>
          )}

          <Link href="/eagleai" className="p-1.5 -mr-1.5 text-[#475569] hover:text-[#0F172A]" aria-label="New chat">
            <Plus size={20} />
          </Link>
        </div>

        {/* Session Loading Screen */}
        {!sessionLoaded ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <EagleOrb size={84} animate />
            <div className="flex flex-col items-center gap-3">
              <p className="text-[13px] font-semibold text-[#0F172A]">Loading conversation</p>
              <div className="flex items-center gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10 pb-36">
              {emptyState && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <EagleOrb size={72} float />
                  <h2 className="mt-8 text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">
                    How can I help you build?
                  </h2>
                  <p className="mt-3 text-[14.5px] text-[#64748B] max-w-md">
                    Ask about architecture, cost, timelines, or what EagleNest can build for you.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-2.5 max-w-xl">
                    {STARTERS.map((starter) => (
                      <motion.button
                        key={starter}
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSend(null, starter)}
                        className="rounded-full border border-[#E3E8F5] bg-white px-4 py-2 text-[13px] font-medium text-[#475569] hover:text-[#5B5FFF] hover:border-[#5B5FFF]/40 hover:shadow-[0_4px_20px_rgba(91,95,255,0.12)] transition-all"
                      >
                        {starter}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={messageMotion}
                  initial="hidden"
                  animate="visible"
                  className="max-w-3xl mx-auto w-full"
                >
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#5B5FFF] to-[#8B5CF6] px-5 py-3.5 text-white shadow-[0_6px_24px_rgba(91,95,255,0.28)]">
                        <div className="text-[15px] text-white font-medium leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3.5">
                      <div className="relative shrink-0 mt-0.5">
                        <EagleOrb size={36} />
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5">
                        <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#94A3B8] mb-2">
                          EagleAI
                        </div>
                        <div className="text-[16px] leading-relaxed text-[#475569]">
                          {msg.content ? (
                            <>
                              <Markdown>{msg.content}</Markdown>
                              {isStreaming && msg === lastMessage && (
                                <span className="streaming-caret" aria-hidden />
                              )}
                            </>
                          ) : isStreaming && msg === lastMessage ? (
                            <ThinkingIndicator status={status} hideOrb />
                          ) : null}

                          {msg.blocks?.map((block, idx) => (
                            <BlockRenderer key={idx} block={block} onLeadClick={openLead} />
                          ))}
                          {msg.richData?.type === "recommendation" && (
                            <RecommendationBlock
                              title={msg.richData.data?.title}
                              reasons={msg.richData.data?.reasons}
                            />
                          )}
                          {msg.sources && msg.sources.length > 0 && (
                            <RagSources sources={msg.sources} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {showStatus && lastMessage?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-3xl mx-auto w-full"
                >
                  <ThinkingIndicator status={status} />
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-12 pt-14 pb-5 bg-gradient-to-t from-white via-white to-transparent">
              <div className="max-w-3xl mx-auto relative group">
                {chatError && !isStreaming && (
                  <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <span className="text-[13px] text-red-600">{chatError}</span>
                    <button
                      onClick={retryLastQuery}
                      className="shrink-0 rounded-full bg-red-600 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                )}

                <div
                  className={cn(
                    "relative rounded-[24px] bg-white transition-all duration-300",
                    isStreaming
                      ? "border border-[#E3E8F5] shadow-[0_-4px_30px_rgba(15,23,42,0.03)]"
                      : "group-focus-within:border-[#5B5FFF]/40 group-focus-within:shadow-[0_-4px_40px_rgba(91,95,255,0.1)] border border-[#E3E8F5] shadow-[0_-4px_30px_rgba(15,23,42,0.03)]"
                  )}
                >
                  <textarea
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={isStreaming ? "EagleAI is responding…" : "Message EagleAI..."}
                    className="w-full bg-transparent px-5 py-4 pr-16 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] resize-none focus:outline-none min-h-[60px] max-h-[200px]"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />

                  <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
                    {!isStreaming && query.trim() && (
                      <span className="hidden sm:flex items-center text-[10px] font-medium text-[#94A3B8] mr-1">
                        <CornerDownLeft size={11} className="mr-0.5" /> Enter
                      </span>
                    )}
                    {isStreaming ? (
                      <motion.button
                        type="button"
                        onClick={stopStreaming}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Stop generating"
                        className="p-2.5 rounded-full bg-[#0F172A] text-white transition-colors hover:bg-[#1E293B]"
                      >
                        <Square size={13} fill="currentColor" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        onClick={(e) => handleSend(e)}
                        disabled={!query.trim()}
                        whileHover={query.trim() ? { scale: 1.08 } : undefined}
                        whileTap={query.trim() ? { scale: 0.92 } : undefined}
                        className={cn(
                          "p-2.5 rounded-full transition-all",
                          query.trim()
                            ? "bg-[#5B5FFF] text-white shadow-[0_4px_16px_rgba(91,95,255,0.4)] hover:bg-[#4a4eff]"
                            : "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                        )}
                        aria-label="Send message"
                      >
                        <ArrowUp size={15} strokeWidth={2.5} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Right Sidebar (Project Context) */}
      <AnimatePresence>
        {safeProjectContext && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden xl:flex flex-col border-l border-[#E3E8F5] bg-white h-full overflow-hidden shrink-0"
          >
            <div className="w-[280px] h-full flex flex-col p-6 overflow-y-auto">
              <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase mb-4">
                PROJECT
              </div>
              <h2 className="text-[18px] font-bold text-[#0F172A] mb-8 leading-tight">
                {safeProjectContext.title}
              </h2>

              <div className="space-y-6 flex-1">
                {safeProjectContext.industry && (
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Industry</div>
                    <div className="text-[13px] text-[#0F172A] font-medium">{safeProjectContext.industry}</div>
                  </div>
                )}

                {safeProjectContext.overview && (
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Overview</div>
                    <p className="text-[13px] text-[#475569] leading-relaxed">{safeProjectContext.overview}</p>
                  </div>
                )}

                {safeProjectContext.requirements.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Requirements</div>
                    <ul className="space-y-1.5">
                      {safeProjectContext.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[13px] text-[#0F172A]">
                          <CheckCircle2 size={14} className="text-[#10B981]" /> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {safeProjectContext.features && safeProjectContext.features.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Features</div>
                    <ul className="space-y-1.5">
                      {safeProjectContext.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px] text-[#0F172A]">
                          <span className="mt-1 w-1 h-1 rounded-full bg-[#5B5FFF]" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <hr className="border-[#E3E8F5]" />

                {safeProjectContext.tech.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-3 uppercase tracking-wider">Recommended</div>
                    <div className="mb-4">
                      <div className="text-[11px] text-[#94A3B8] mb-1">Technology</div>
                      <div className="flex flex-col gap-1">
                        {safeProjectContext.tech.map((t, idx) => (
                          <div key={idx} className="text-[13px] text-[#0F172A] font-medium">{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {safeProjectContext.timeline && (
                  <div>
                    <div className="text-[11px] text-[#94A3B8] mb-1">Timeline</div>
                    <div className="text-[13px] text-[#0F172A] font-medium">{safeProjectContext.timeline}</div>
                    {safeProjectContext.estimate && (
                      <div className="text-[11px] text-[#94A3B8] mt-3 mb-1">Estimate</div>
                    )}
                    {safeProjectContext.estimate && (
                      <div className="text-[13px] text-[#0F172A] font-medium">{safeProjectContext.estimate}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E3E8F5]">
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] font-bold text-[#64748B] uppercase mb-2">
                    <span>Progress</span>
                    <span>{safeProjectContext.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${safeProjectContext.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-[#5B5FFF] rounded-full"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowProjectPlan(true)}
                  className="w-full py-3 rounded-lg border border-[#5B5FFF] text-[#5B5FFF] hover:bg-[#5B5FFF]/[0.06] text-[12px] font-semibold tracking-[0.05em] transition-colors"
                >
                  Build Project Plan →
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Linear-style Project Workspace Overlay */}
      <AnimatePresence>
        {showProjectPlan && safeProjectContext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden"
          >
            <header className="h-[60px] border-b border-[#E3E8F5] flex items-center justify-between px-6 bg-white shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowProjectPlan(false)}
                  className="text-[#64748B] hover:text-[#0F172A] flex items-center gap-2 text-[13px] font-medium transition-colors"
                >
                  ← Back to chat
                </button>
                <div className="w-px h-4 bg-[#E3E8F5]"></div>
                <span className="text-[14px] font-bold text-[#0F172A]">{safeProjectContext.title}</span>
              </div>
              <div className="flex gap-4 text-[13px] font-medium text-[#64748B]">
                {(
                  [
                    ["plan-overview", "Overview"],
                    ["plan-architecture", "Architecture"],
                    ["plan-features", "Features"],
                    ["plan-timeline", "Timeline"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() =>
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-[#0F172A] transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#FAFAFA] p-8 md:p-16">
              <div className="max-w-4xl mx-auto space-y-12">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">{safeProjectContext.title}</h1>

                  <div id="plan-overview" className="mb-12 scroll-mt-8">
                    <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase border-b border-[#E3E8F5] pb-2 mb-6">
                      PROJECT OVERVIEW
                    </div>
                    <p className="text-[16px] text-[#475569] leading-relaxed">
                      {safeProjectContext.overview ??
                        (safeProjectContext.requirements.length > 0
                          ? safeProjectContext.requirements.join(". ")
                          : "A project plan generated from your conversation with EagleAI.")}
                    </p>
                  </div>

                  <div id="plan-architecture" className="mb-12 scroll-mt-8">
                    <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase border-b border-[#E3E8F5] pb-2 mb-6">
                      ARCHITECTURE
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {safeProjectContext.tech.map((t, idx) => (
                        <span key={idx} className="text-[12px] font-medium text-[#0F172A] bg-white border border-[#E3E8F5] px-3 py-1.5 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>

                    {safeProjectContext.milestones && safeProjectContext.milestones.length > 0 && (
                      <div>
                        <div className="text-[11px] font-semibold text-[#64748B] mb-3 uppercase tracking-wider">Milestones</div>
                        <ol className="space-y-3">
                          {safeProjectContext.milestones.map((milestone, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[14px] text-[#0F172A]">
                              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#5B5FFF]/10 text-[#5B5FFF] text-[10px] font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              {milestone}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>

                  {safeProjectContext.features && safeProjectContext.features.length > 0 && (
                    <div id="plan-features" className="mb-12 scroll-mt-8">
                      <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase border-b border-[#E3E8F5] pb-2 mb-6">
                        FEATURES
                      </div>
                      <ul className="space-y-3">
                        {safeProjectContext.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[15px] text-[#475569]">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5B5FFF] shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div id="plan-timeline" className="scroll-mt-8">
                    <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase border-b border-[#E3E8F5] pb-2 mb-6">
                      TIMELINE & ESTIMATE
                    </div>
                    <p className="text-[16px] text-[#475569] leading-relaxed">
                      {safeProjectContext.timeline || "To be defined."}
                    </p>
                    {safeProjectContext.estimate && (
                      <p className="mt-4 text-[16px] text-[#0F172A] font-semibold">
                        Estimated investment: {safeProjectContext.estimate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-[#E3E8F5]">
                <Link href="/eagleai" className="flex items-center gap-2.5">
                  <EagleOrb size={28} animate={false} />
                  <span className="text-[13px] font-bold tracking-[0.1em] text-[#0F172A]">EagleAI</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#64748B] hover:text-[#0F172A]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <Link
                  href="/eagleai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E3E8F5] px-4 py-2.5 text-[12px] font-semibold tracking-[0.05em] text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <Plus size={14} /> New Chat
                </Link>
                {todaySessions.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Today</h3>
                    {renderSessions(todaySessions)}
                  </div>
                )}
                {yesterdaySessions.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Yesterday</h3>
                    {renderSessions(yesterdaySessions)}
                  </div>
                )}
                {olderSessions.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] mb-3 uppercase">Previous</h3>
                    {renderSessions(olderSessions)}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Context Panel (Bottom Sheet) */}
      <AnimatePresence>
        {mobileContextOpen && safeProjectContext && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-[70] xl:hidden"
              onClick={() => setMobileContextOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[80] rounded-t-3xl shadow-[0_-20px_40px_rgba(15,23,42,0.1)] xl:hidden max-h-[85dvh] flex flex-col"
            >
              <div className="flex justify-center pt-3 pb-2 shrink-0">
                <div className="w-12 h-1.5 bg-[#E3E8F5] rounded-full" />
              </div>
              <div className="px-6 pb-2 flex items-center justify-between border-b border-[#E3E8F5] shrink-0">
                <div className="text-[11px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase">
                  PROJECT CONTEXT
                </div>
                <button
                  onClick={() => setMobileContextOpen(false)}
                  className="p-1 -mr-1 text-[#64748B] hover:text-[#0F172A]"
                  aria-label="Close context panel"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <h2 className="text-[20px] font-bold text-[#0F172A] mb-8 leading-tight">
                  {safeProjectContext.title}
                </h2>

                <div className="space-y-6">
                  {safeProjectContext.overview && (
                    <div>
                      <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Overview</div>
                      <p className="text-[14px] text-[#475569] leading-relaxed">{safeProjectContext.overview}</p>
                    </div>
                  )}

                  {safeProjectContext.requirements.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Requirements</div>
                      <ul className="space-y-2">
                        {safeProjectContext.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[14px] text-[#0F172A]">
                            <CheckCircle2 size={16} className="text-[#10B981]" /> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {safeProjectContext.features && safeProjectContext.features.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-[#64748B] mb-2 uppercase tracking-wider">Features</div>
                      <ul className="space-y-2">
                        {safeProjectContext.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[14px] text-[#0F172A]">
                            <span className="mt-2 w-1 h-1 rounded-full bg-[#5B5FFF] shrink-0" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {safeProjectContext.estimate && (
                    <div className="text-[14px] text-[#0F172A] font-semibold">
                      Estimated investment: {safeProjectContext.estimate}
                    </div>
                  )}

                  <div className="pt-6 border-t border-[#E3E8F5]">
                    <button
                      onClick={() => {
                        setMobileContextOpen(false);
                        setShowProjectPlan(true);
                      }}
                      className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white text-[13px] font-semibold tracking-[0.05em] transition-colors"
                    >
                      View Project Plan →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {leadOpen && (
          <LeadCapture
            onClose={() => setLeadOpen(false)}
            summary={leadSummary}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
