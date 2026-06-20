"use client";
import React, { useEffect, useState } from "react";
import { GlassPanel, motionVariants } from "@healthmesh/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { 
  User, Building2, Pill, Shield, Brain, ArrowRight, Activity, 
  Upload, Key, FileSignature, QrCode, ShieldAlert, CheckCircle2, AlertTriangle, Play, ShieldCheck 
} from "lucide-react";
import { HealthcareNetworkGraph } from "../components/charts/HealthcareNetworkGraph";

// Animated Counter Component
const Counter = ({ value, label }: { value: number, label: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const totalDuration = 1000;
    let incrementTime = (totalDuration / end);
    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-5xl font-light text-white mb-1">{displayValue}</span>
      <span className="text-xs text-white/50 uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default function HomeDashboard() {
  const router = useRouter();
  const { records, grants, prescriptions, auditLogs, user } = useStore();

  const portals = [
    {
      id: "patient",
      title: "Patient Portal",
      desc: "Manage vault, consents, and Continuity Capsule.",
      icon: User,
      color: "text-[#29F0E0]",
      bg: "bg-[#29F0E0]/10",
      border: "border-[#29F0E0]/30",
      href: "/patient-dashboard",
      accent: "cyan",
      activity: "Last record: MRI Scan",
      status: "Active",
      notifications: records.length
    },
    {
      id: "hospital",
      title: "Hospital Portal",
      desc: "Patient search, prescribe, and break-glass.",
      icon: Building2,
      color: "text-[#2E6FFF]",
      bg: "bg-[#2E6FFF]/10",
      border: "border-[#2E6FFF]/30",
      href: "/hospital-dashboard",
      accent: "blue",
      activity: "Active Break-Glass: 0",
      status: "Operational",
      notifications: grants.filter(g => g.nodeId === 'hospital').length
    },
    {
      id: "pharmacy",
      title: "Pharmacy Portal",
      desc: "QR scanning, dispense workflow, fraud check.",
      icon: Pill,
      color: "text-[#2ED9A3]",
      bg: "bg-[#2ED9A3]/10",
      border: "border-[#2ED9A3]/30",
      href: "/pharmacy-dashboard",
      accent: "green",
      activity: "Inventory Status: Optimal",
      status: "Online",
      notifications: prescriptions.filter(p => p.status === 'active').length
    },
    {
      id: "insurance",
      title: "Insurance Portal",
      desc: "Claims processing and smart contract rules.",
      icon: Shield,
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
      border: "border-[#F59E0B]/30",
      href: "/insurance-dashboard",
      accent: "amber",
      activity: "Auto-Adjudication: 96%",
      status: "Syncing",
      notifications: 2
    },
    {
      id: "ai",
      title: "AI Intelligence Center",
      desc: "Global network oversight and anomaly logs.",
      icon: Brain,
      color: "text-[#A855F7]",
      bg: "bg-[#A855F7]/10",
      border: "border-[#A855F7]/30",
      href: "/ai-dashboard",
      accent: "purple",
      activity: "Anomalies Detected: 0",
      status: "Monitoring",
      notifications: 0
    }
  ];

  return (
    <div className="min-h-screen pl-[80px] w-full p-6 md:p-10 max-w-[1600px] mx-auto font-sans">
      
      {/* SECTION 1: EXECUTIVE HERO */}
      <section className="mb-16 mt-8">
        <motion.div initial="initial" animate="animate" variants={motionVariants.staggerContainer} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="max-w-3xl">
            <motion.p variants={motionVariants.resolveIn} className="text-xs font-mono uppercase tracking-[0.2em] text-[#29F0E0] mb-4">HealthMesh OS</motion.p>
            <motion.h1 variants={motionVariants.resolveIn} className="text-5xl md:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              Patient-Owned <br />Healthcare Trust Network
            </motion.h1>
            <motion.p variants={motionVariants.resolveIn} className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
              Secure healthcare data ownership, intelligent continuity, consent-driven access, and prescription verification—all powered by an immutable ledger.
            </motion.p>
          </div>
          
          <motion.div variants={motionVariants.resolveIn} className="flex gap-8 md:gap-12 bg-white/[0.02] p-8 rounded-3xl border border-white/5 backdrop-blur-md">
            <Counter value={records.length * 142} label="Network Nodes" />
            <Counter value={grants.length * 89} label="Active Consents" />
            <Counter value={prescriptions.length * 534} label="Prescriptions" />
            <Counter value={99} label="Trust Score" />
          </motion.div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 2: PORTAL LAUNCHER */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Active Workspaces
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portals.map((portal, i) => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassPanel 
                    accentColor={portal.accent as any}
                    className={`p-6 h-full cursor-pointer hover:-translate-y-1 transition-transform border ${portal.border} group`}
                    onClick={() => router.push(portal.href)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-xl ${portal.bg} flex items-center justify-center`}>
                        <portal.icon className={`w-6 h-6 ${portal.color}`} />
                      </div>
                      {portal.notifications > 0 && (
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${portal.bg} ${portal.color}`}>
                          {portal.notifications} Action{portal.notifications > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">{portal.title}</h3>
                    <p className="text-white/50 text-sm mb-6 line-clamp-2">{portal.desc}</p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${portal.status === 'Active' || portal.status === 'Operational' || portal.status === 'Online' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                        <span className="text-xs text-white/40">{portal.activity}</span>
                      </div>
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${portal.color} text-sm font-medium`}>
                        Launch <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 4: HEALTHCARE NETWORK OVERVIEW */}
          <section>
             <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Live Network Topology
            </h2>
            <HealthcareNetworkGraph />
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* SECTION 5: QUICK ACTIONS */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Play className="w-4 h-4" /> Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Upload Record", icon: Upload, href: "/vault", color: "text-[#29F0E0]" },
                { label: "Request Access", icon: Key, href: "/consent", color: "text-[#2E6FFF]" },
                { label: "Prescribe", icon: FileSignature, href: "/prescribe", color: "text-[#2ED9A3]" },
                { label: "Verify QR", icon: QrCode, href: "/scan", color: "text-[#F59E0B]" },
                { label: "Run Check", icon: ShieldAlert, href: "/ai-dashboard", color: "text-[#FF4D6D]" },
                { label: "Capsule", icon: Brain, href: "/capsule", color: "text-[#A855F7]" },
              ].map((action, i) => (
                <button 
                  key={i}
                  onClick={() => router.push(action.href)}
                  className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-3 text-center group"
                >
                  <action.icon className={`w-6 h-6 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-white/70 font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 6: INSIGHTS */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Brain className="w-4 h-4" /> System Insights
            </h2>
            <div className="space-y-4">
               <GlassPanel accentColor="green" className="p-5 flex gap-4 items-start">
                 <CheckCircle2 className="w-5 h-5 text-[#2ED9A3] shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-white text-sm font-medium mb-1">Prescriptions Verified</h4>
                   <p className="text-white/50 text-xs leading-relaxed">3 cryptographic signatures verified against provider nodes today. No anomalies detected.</p>
                 </div>
               </GlassPanel>
               <GlassPanel accentColor="amber" className="p-5 flex gap-4 items-start">
                 <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-white text-sm font-medium mb-1">Consent Pending</h4>
                   <p className="text-white/50 text-xs leading-relaxed">Walgreens Pharmacy is awaiting access to dispense active prescriptions.</p>
                 </div>
               </GlassPanel>
               <GlassPanel accentColor="cyan" className="p-5 flex gap-4 items-start">
                 <ShieldCheck className="w-5 h-5 text-[#29F0E0] shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-white text-sm font-medium mb-1">Network Integrity</h4>
                   <p className="text-white/50 text-xs leading-relaxed">All 4 active nodes are fully synchronized with the immutable audit chain.</p>
                 </div>
               </GlassPanel>
            </div>
          </section>

          {/* SECTION 3: PLATFORM ACTIVITY */}
          <section>
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Event Stream
            </h2>
            <GlassPanel className="p-0 overflow-hidden">
              <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {auditLogs.slice(0, 8).map((log, i) => (
                    <motion.div 
                      key={log.id} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: i * 0.05 }}
                      className="p-4 flex gap-4 items-start hover:bg-white/[0.02] transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        log.type === 'security' ? 'bg-[#FF4D6D]/10 text-[#FF4D6D]' : 
                        log.type === 'access' ? 'bg-[#29F0E0]/10 text-[#29F0E0]' : 
                        'bg-[#2E6FFF]/10 text-[#2E6FFF]'
                      }`}>
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white text-sm font-medium truncate pr-2">{log.title}</h4>
                          <span className="text-[10px] text-white/30 font-mono whitespace-nowrap">{log.time}</span>
                        </div>
                        <p className="text-xs text-white/50 truncate">{log.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassPanel>
          </section>

        </div>
      </div>
    </div>
  );
}
