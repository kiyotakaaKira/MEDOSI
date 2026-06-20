"use client";
import React from "react";
import { GlassPanel, motionVariants } from "@healthmesh/ui";
import { motion } from "framer-motion";
import { Bell, Activity, Pill, Shield, Clock, FileText } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="p-6 md:p-10 max-w-[800px] mx-auto min-h-screen">
      <header className="mb-10 flex justify-between items-end">
        <motion.div initial="initial" animate="animate" variants={motionVariants.staggerContainer}>
          <motion.p variants={motionVariants.resolveIn} className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#29F0E0]/80 mb-2">Activity Feed</motion.p>
          <motion.h1 variants={motionVariants.resolveIn} className="text-4xl font-light text-white tracking-tight">Notifications</motion.h1>
        </motion.div>
        <button className="text-[#29F0E0] text-sm hover:underline">Mark all as read</button>
      </header>

      <div className="flex flex-col gap-4">
        {[
          { title: "Prescription Dispensed", desc: "Walgreens Pharmacy verified and fulfilled Amoxicillin.", time: "2 hours ago", icon: Pill, color: "text-[#2ED9A3]", bg: "bg-[#2ED9A3]/10", unread: true },
          { title: "Lab Results Added", desc: "Apollo Demo Hospital cryptographically signed new records.", time: "4 hours ago", icon: FileText, color: "text-[#29F0E0]", bg: "bg-[#29F0E0]/10", unread: true },
          { title: "Consent Request", desc: "Mercy Clinic requested access to your Health Vault.", time: "1 day ago", icon: Shield, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", unread: false },
          { title: "Continuity Capsule Generated", desc: "AI successfully synthesized your medical journey.", time: "2 days ago", icon: Activity, color: "text-[#2E6FFF]", bg: "bg-[#2E6FFF]/10", unread: false },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <GlassPanel className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${item.unread ? 'bg-white/[0.04] border-[#29F0E0]/30' : 'hover:bg-white/[0.02]'}`}>
              <div className={`p-3 rounded-xl ${item.bg} shrink-0 relative`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {item.unread && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#29F0E0] border-2 border-[#0A0A0A]" />}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-sm text-white/50 mt-1">{item.desc}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-white/30 font-mono">
                  <Clock className="w-3 h-3" /> {item.time}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
