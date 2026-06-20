"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalSidebar } from "../../components/GlobalSidebar";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-[#05070A] font-sans">
      <div className="flex-1 flex flex-col pl-[80px] overflow-hidden relative">
        <main className="flex-1 relative overflow-y-auto">
          <Breadcrumbs />
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
