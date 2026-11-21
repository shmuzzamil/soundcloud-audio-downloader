import React from "react";

interface AdSlotProps {
  slotType?: "leaderboard" | "rectangle" | "native";
  className?: string;
}

export function AdSlot({ slotType = "leaderboard", className = "" }: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  if (!adsEnabled) {
    return null;
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 text-center my-6 transition-colors ${className}`}
    >
      <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
        Sponsored Advertisement
      </span>
      <div
        className={`mx-auto flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-400 ${
          slotType === "leaderboard"
            ? "h-24 max-w-2xl"
            : slotType === "rectangle"
            ? "h-64 max-w-xs"
            : "h-20 max-w-lg"
        }`}
      >
        <span>Ad Placement Placeholder (Non-Intrusive)</span>
      </div>
    </div>
  );
}

