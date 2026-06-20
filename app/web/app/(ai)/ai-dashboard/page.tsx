"use client";
import React, { useState } from "react";
import { GlassPanel, motionVariants } from "@healthmesh/ui";
import { motion } from "framer-motion";
import { Brain, Network, Activity, ShieldAlert, Cpu, Zap, Database } from "lucide-react";
import dynamic from "next/dynamic";

export default function AIDashboard() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto min-h-screen">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial="initial" animate="animate" variants={motionVariants.staggerContainer}>
          <motion.p variants={motionVariants.resolveIn} className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A855F7]/80 mb-2">Network Oversight</motion.p>
          <motion.h1 variants={motionVariants.resolveIn} className="text-4xl font-light text-white tracking-tight">AI Intelligence Center</motion.h1>
        </motion.div>
      </header>

      <motion.div 
        variants={motionVariants.staggerContainer} 
        initial="initial" 
        animate="animate" 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      >
        <motion.div variants={motionVariants.resolveIn}>
          <GlassPanel accentColor="purple" className="p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center border border-[#A855F7]/20">
                <Brain className="w-5 h-5 text-[#A855F7]" />
              </div>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Capsules Synthesized</h3>
            <p className="text-3xl font-light text-white">42.5M <span className="text-base text-white/40">Total</span></p>
          </GlassPanel>
        </motion.div>

        <motion.div variants={motionVariants.resolveIn}>
          <GlassPanel accentColor="blue" className="p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2E6FFF]/10 flex items-center justify-center border border-[#2E6FFF]/20">
                <Cpu className="w-5 h-5 text-[#2E6FFF]" />
              </div>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Active Inference Nodes</h3>
            <p className="text-3xl font-light text-white">1,024 <span className="text-base text-white/40">Global</span></p>
          </GlassPanel>
        </motion.div>

        <motion.div variants={motionVariants.resolveIn}>
          <GlassPanel accentColor="red" className="p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF4D6D]/10 flex items-center justify-center border border-[#FF4D6D]/20">
                <ShieldAlert className="w-5 h-5 text-[#FF4D6D]" />
              </div>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Anomalies Detected</h3>
            <p className="text-3xl font-light text-white">3,892 <span className="text-base text-white/40">Blocked</span></p>
          </GlassPanel>
        </motion.div>

        <motion.div variants={motionVariants.resolveIn}>
          <GlassPanel accentColor="green" className="p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2ED9A3]/10 flex items-center justify-center border border-[#2ED9A3]/20">
                <Zap className="w-5 h-5 text-[#2ED9A3]" />
              </div>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1">Avg Synthesis Time</h3>
            <p className="text-3xl font-light text-white">0.4<span className="text-base text-white/40">s</span></p>
          </GlassPanel>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-[500px]">
             <GlassPanel className="p-0 overflow-hidden h-full flex flex-col">
               <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                 <h2 className="text-lg font-medium text-white flex items-center gap-2">
                   <Network className="w-5 h-5 text-[#A855F7]" /> Federated Learning Network
                 </h2>
               </div>
               <div className="flex-1 bg-black/40 relative flex items-center justify-center overflow-hidden">
                 {/* Visual Mock of Neural Network */}
                 <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                         d="M0,50 Q25,25 50,50 T100,50" 
                         fill="none" 
                         stroke="#A855F7" 
                         strokeWidth="0.5" 
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ pathLength: 1, opacity: 1 }}
                         transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                      <motion.path 
                         d="M0,50 Q25,75 50,50 T100,50" 
                         fill="none" 
                         stroke="#29F0E0" 
                         strokeWidth="0.5" 
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ pathLength: 1, opacity: 1 }}
                         transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </svg>
                 </div>
                 
                 <div className="z-10 flex gap-12">
                   {[
                     { id: "input", nodes: 4, color: "bg-[#2E6FFF]" },
                     { id: "hidden1", nodes: 6, color: "bg-[#A855F7]" },
                     { id: "hidden2", nodes: 5, color: "bg-[#A855F7]" },
                     { id: "output", nodes: 2, color: "bg-[#2ED9A3]" },
                   ].map(layer => (
                     <div key={layer.id} className="flex flex-col gap-4 justify-center">
                       {Array.from({length: layer.nodes}).map((_, i) => (
                         <motion.div 
                           key={i} 
                           animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                           transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                           className={`w-4 h-4 rounded-full ${layer.color} shadow-[0_0_15px_currentColor]`} 
                         />
                       ))}
                     </div>
                   ))}
                 </div>
               </div>
             </GlassPanel>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="h-full">
            <GlassPanel accentColor="purple" className="p-6 h-full border-[#A855F7]/20 bg-gradient-to-br from-[#A855F7]/5 to-transparent">
               <h3 className="text-[#A855F7] uppercase text-[10px] tracking-widest font-mono mb-4 flex items-center gap-2">
                 <Activity className="w-3.5 h-3.5" /> Live Inference Stream
               </h3>
               
               <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                 {[
                   { event: "Capsule Generation", hospital: "Apollo Hospital", time: "1s ago", type: "success" },
                   { event: "Fraud Risk Analysis", hospital: "Walgreens Pharmacy", time: "3s ago", type: "success" },
                   { event: "Anomaly Detection", hospital: "HealthMesh Core", time: "12s ago", type: "warning" },
                   { event: "Drug Interaction Check", hospital: "Mercy Clinic", time: "18s ago", type: "success" },
                   { event: "ZKP Validation", hospital: "Blue Cross", time: "24s ago", type: "success" },
                   { event: "Capsule Generation", hospital: "UCSF Medical", time: "31s ago", type: "success" },
                 ].map((log, i) => (
                   <div key={i} className="flex flex-col gap-1 p-3 bg-black/40 rounded-lg border border-white/5">
                     <div className="flex justify-between items-start">
                       <span className={`text-sm font-medium ${log.type === 'warning' ? 'text-[#FF4D6D]' : 'text-white'}`}>{log.event}</span>
                       <span className="text-[10px] font-mono text-white/40">{log.time}</span>
                     </div>
                     <span className="text-xs text-white/50">{log.hospital}</span>
                   </div>
                 ))}
               </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
