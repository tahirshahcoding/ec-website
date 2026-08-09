import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  className,
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "w-full h-px bg-[#E3E8F5]"
          : "h-full w-px bg-[#E3E8F5]",
        className
      )}
      aria-hidden="true"
    />
  );
}
