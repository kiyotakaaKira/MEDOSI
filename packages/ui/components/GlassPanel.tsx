"use client";
import React from "react";
import { cn } from "../lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  accentColor?: "cyan" | "blue" | "purple" | "red" | "green" | "amber";
  children: React.ReactNode;
  variant?: "panel" | "lens";
}

const accentMap = {
  cyan: "border-[#29F0E0]/25 shadow-[0_0_30px_rgba(41,240,224,0.08)]",
  blue: "border-[#2E6FFF]/25 shadow-[0_0_30px_rgba(46,111,255,0.08)]",
  purple: "border-[#8B5CF6]/25 shadow-[0_0_30px_rgba(139,92,246,0.08)]",
  red: "border-[#FF4D6D]/25 shadow-[0_0_30px_rgba(255,77,109,0.08)]",
  green: "border-[#2ED9A3]/25 shadow-[0_0_30px_rgba(46,217,163,0.08)]",
  amber: "border-[#F59E0B]/25 shadow-[0_0_30px_rgba(245,158,11,0.08)]",
};

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, accentColor, variant = "panel", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          variant === "lens" ? "glass-lens" : "glass-panel",
          "p-6 relative overflow-hidden transition-all duration-500",
          accentColor && accentMap[accentColor],
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {accentColor && (
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${
                accentColor === "cyan"
                  ? "rgba(41,240,224,0.15)"
                  : accentColor === "blue"
                    ? "rgba(46,111,255,0.15)"
                    : accentColor === "purple"
                      ? "rgba(139,92,246,0.15)"
                      : accentColor === "red"
                        ? "rgba(255,77,109,0.15)"
                        : accentColor === "green"
                          ? "rgba(46,217,163,0.15)"
                          : "rgba(245,158,11,0.15)"
              } 0%, transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);
GlassPanel.displayName = "GlassPanel";
