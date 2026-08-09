"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const raw =
    typeof children === "string"
      ? children
      : String(children ?? "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — ignore.
    }
  };

  return (
    <div className="group/code relative">
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-[#CBD5E1] opacity-0 transition-all hover:bg-white/20 hover:text-white group-hover/code:opacity-100"
      >
        {copied ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="pt-2 pr-14">{children}</pre>
    </div>
  );
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
