import { cn } from "@/lib/utils";

interface EagleOrbProps {
  size?: number;
  className?: string;
  /** Show the concentric "listening" rings around the orb */
  animate?: boolean;
  /** Slow ambient float */
  float?: boolean;
}

/** Minimal geometric eagle mark drawn as a single continuous path. */
export function EagleMark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 20c4.5-1.2 7-3.8 8.4-8C13.5 8.2 15.9 6.6 21 6c-1.4 2-1.2 3.8-.3 5.4C18.6 10.8 17 11.6 16 13.4c-1.4 2.9-2.8 5.6-5.2 6.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20c4.2 1.1 7.6.3 10.3-2.1M4.5 9.5c2.4 1.6 4.5.9 6.4-.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function EagleOrb({ size = 44, className, animate = true, float = false }: EagleOrbProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", float && "orb-float", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {animate && (
        <>
          <span className="orb-ring" style={{ animationDelay: "0s" }} />
          <span className="orb-ring" style={{ animationDelay: "1.1s" }} />
        </>
      )}

      <div
        className={cn("orb-core relative flex items-center justify-center rounded-full", animate && "shimmer-sweep")}
        style={{ width: size * 0.82, height: size * 0.82, boxShadow: "0 8px 30px rgba(91,95,255,0.35)" }}
      >
        <EagleMark size={size * 0.46} className="text-white" />
      </div>
    </div>
  );
}
