import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "muted";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const variants = {
    default:
      "bg-[#0F172A]/[0.05] text-[#0F172A] border border-[#E3E8F5]",
    primary:
      "bg-[#5B5FFF]/[0.08] text-[#5B5FFF] border border-[#5B5FFF]/[0.15]",
    muted: "bg-[#475569]/[0.08] text-[#475569] border border-[#E3E8F5]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
