"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "../store/useStore";
import { 
  Home, Activity, Shield, Share2, Pill, FileText, Settings, 
  Bell, LogOut, HeartPulse, Stethoscope, Search, User, Key, Building2, ShieldAlert, Brain
} from "lucide-react";
import { toast } from "sonner";

export function GlobalSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);
  const [expanded, setExpanded] = useState(false);

  if (!user && pathname !== "/log-in") {
    // If not logged in but on a page, might just be null, but let's hide it safely
    // Actually we will just return null if no user
  }
  
  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/log-in");
  };

  const links = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "Patient Portal", href: "/patient-dashboard" },
    { icon: Building2, label: "Hospital Portal", href: "/hospital-dashboard" },
    { icon: Pill, label: "Pharmacy Portal", href: "/pharmacy-dashboard" },
    { icon: Shield, label: "Insurance Portal", href: "/insurance-dashboard" },
    { icon: Brain, label: "AI Center", href: "/ai-dashboard" },
  ];

  return (
    <motion.div 
      className="h-screen bg-black/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between py-6 z-50 fixed left-0 top-0 transition-all duration-300 shadow-2xl"
      animate={{ width: expanded ? 260 : 80 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex flex-col gap-6 px-4">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#29F0E0] to-[#2E6FFF] p-[1px] shrink-0">
            <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#29F0E0]" />
            </div>
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                <span className="text-white font-medium tracking-tight">HealthMesh AI</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
              >
                <link.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#29F0E0]' : ''}`} />
                <AnimatePresence>
                  {expanded && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap text-sm font-medium">
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 flex flex-col gap-2">
        <button className="flex items-center gap-4 px-3 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all" onClick={() => toast("Notifications opened")}>
          <Bell className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap">Notifications</motion.span>}
          </AnimatePresence>
        </button>
        <button className="flex items-center gap-4 px-3 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all" onClick={() => toast("Settings opened")}>
          <Settings className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap">Settings</motion.span>}
          </AnimatePresence>
        </button>
        <div className="h-[1px] bg-white/10 w-full my-2" />
        <button onClick={handleLogout} className="flex items-center gap-4 px-3 py-3 rounded-xl text-[#FF4D6D]/70 hover:bg-[#FF4D6D]/10 hover:text-[#FF4D6D] transition-all mt-2">
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap">Sign Out</motion.span>}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
