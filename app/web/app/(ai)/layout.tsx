"use client";
import React from "react";
import { CommandRail, TopBar } from "@healthmesh/ui";
import { Brain, Activity, Network, Database } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function AILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Brain, label: "Intelligence Dashboard", href: "/ai-dashboard", isActive: pathname.startsWith("/ai-dashboard") || pathname === "/dashboard" },
    { icon: Network, label: "Node Topology", href: "#", isActive: false },
    { icon: Activity, label: "Anomaly Logs", href: "#", isActive: false },
    { icon: Database, label: "Training Registry", href: "#", isActive: false },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#05070A]">
      <CommandRail items={navItems} onNavigate={(href) => href !== "#" && router.push(href)} className="border-purple-500/20" />
      <div className="flex-1 flex flex-col pl-20 overflow-hidden relative">
        <TopBar />
        <main className="flex-1 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
