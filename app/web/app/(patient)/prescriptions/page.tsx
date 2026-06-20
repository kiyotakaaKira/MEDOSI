"use client";
import React, { useState } from "react";
import { GlassPanel, motionVariants } from "@healthmesh/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, ShieldCheck, AlertTriangle, Download, Share2, QrCode } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { DataTable } from "../../../components/DataTable";
import { MedicationTimeline } from "../../../components/charts/MedicationTimeline";

type RxStatus = "active" | "dispensed" | "expired" | "flagged";

export default function PrescriptionCenterPage() {
  const [activeTab, setActiveTab] = useState<RxStatus | "all">("all");
  const [selectedRx, setSelectedRx] = useState<string | null>(null);

  const prescriptions = useStore(state => state.prescriptions);

  const filtered = prescriptions.filter(rx => 
    (activeTab === "all" || rx.status === activeTab)
  );

  const selected = prescriptions.find(rx => rx.id === selectedRx);

  const columns = [
    {
      header: "Medication",
      accessorKey: "medication",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg shrink-0 ${
            item.status === 'active' ? 'bg-[#29F0E0]/10 text-[#29F0E0]' :
            item.status === 'dispensed' ? 'bg-[#2ED9A3]/10 text-[#2ED9A3]' :
            item.status === 'flagged' ? 'bg-[#FF4D6D]/10 text-[#FF4D6D]' :
            'bg-white/10 text-white/50'
          }`}>
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <span className="font-medium text-white">{item.medication}</span>
            <span className="text-xs text-white/50 block">{item.dosage}</span>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: any) => (
        <span className={`px-2 py-1 rounded text-[10px] uppercase font-mono border ${
          item.status === 'active' ? 'bg-[#29F0E0]/10 text-[#29F0E0] border-[#29F0E0]/30' :
          item.status === 'dispensed' ? 'bg-[#2ED9A3]/10 text-[#2ED9A3] border-[#2ED9A3]/30' :
          item.status === 'flagged' ? 'bg-[#FF4D6D]/10 text-[#FF4D6D] border-[#FF4D6D]/30' :
          'bg-white/10 text-white/50 border-white/20'
        }`}>
          {item.status === 'flagged' ? 'Fraud Risk' : item.status}
        </span>
      )
    },
    {
      header: "Doctor / Hospital",
      accessorKey: "doctor",
      cell: (item: any) => (
        <div>
          <span className="text-white block">{item.doctor}</span>
          <span className="text-xs text-white/50 block">{item.hospital}</span>
        </div>
      )
    },
    {
      header: "Issue Date",
      accessorKey: "issueDate",
      sortable: true,
      cell: (item: any) => <span className="font-mono text-white/80">{item.issueDate}</span>
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => (
        <div className="flex flex-col items-start gap-1">
          <button 
            onClick={() => setSelectedRx(item.id)}
            className="text-[#29F0E0] hover:underline text-xs font-medium"
          >
            View Details
          </button>
          {item.status === 'active' && (
             <button className="text-[10px] text-white/50 hover:text-white flex items-center gap-1 mt-1" onClick={() => setSelectedRx(item.id)}><QrCode className="w-3 h-3"/> View QR Capsule</button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto min-h-screen font-sans">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial="initial" animate="animate" variants={motionVariants.staggerContainer}>
          <motion.p variants={motionVariants.resolveIn} className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#29F0E0]/80 mb-2">Pharmacy Operations</motion.p>
          <motion.h1 variants={motionVariants.resolveIn} className="text-4xl font-light text-white tracking-tight">Prescription Center</motion.h1>
        </motion.div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <GlassPanel className="p-6">
            <h2 className="text-lg font-medium text-white mb-6">Medication Adherence vs Expected</h2>
            <MedicationTimeline />
          </GlassPanel>

          <GlassPanel className="p-0 overflow-hidden">
             <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
                {['all', 'active', 'dispensed', 'flagged', 'expired'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <div className="p-4">
               <DataTable 
                 data={filtered}
                 columns={columns}
                 searchPlaceholder="Search meds or doctors..."
                 searchableKey="medication"
               />
             </div>
           </GlassPanel>
        </div>

        {/* Details Panel */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full lg:w-[400px] shrink-0"
            >
              <GlassPanel accentColor={
                selected.status === 'active' ? 'cyan' :
                selected.status === 'dispensed' ? 'green' :
                selected.status === 'flagged' ? 'red' : 'default'
              } className="p-6 sticky top-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-light text-white">{selected.medication}</h2>
                    <p className="text-[#29F0E0] text-sm font-medium mt-1">{selected.dosage}</p>
                  </div>
                  <button onClick={() => setSelectedRx(null)} className="text-white/40 hover:text-white">✕</button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                     <ShieldCheck className={`w-5 h-5 ${selected.fraudScore > 80 ? 'text-[#2ED9A3]' : 'text-[#FF4D6D]'}`} />
                     <div>
                       <p className="text-[10px] uppercase text-white/40 font-mono tracking-wider">AI Fraud Score</p>
                       <p className="text-sm text-white font-medium">{selected.fraudScore}/100 
                         {selected.fraudScore > 80 ? <span className="text-[#2ED9A3] ml-2">Authentic</span> : <span className="text-[#FF4D6D] ml-2">Suspicious</span>}
                       </p>
                     </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Prescriber</p>
                    <p className="text-sm text-white">{selected.doctor}</p>
                    <p className="text-xs text-white/50">{selected.hospital}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Patient Instructions</p>
                    <p className="text-sm text-white p-3 rounded bg-black/40 border border-white/5 italic">"{selected.instructions}"</p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Refills</p>
                      <p className="text-sm text-white">{selected.refills} Remaining</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Validity</p>
                      <p className="text-sm font-mono text-white">{selected.issueDate} — {selected.expiry}</p>
                    </div>
                  </div>
                </div>

                {selected.status === 'active' && (
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-square bg-white rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                       {/* Mock QR Code Visual */}
                       <div className="grid grid-cols-6 grid-rows-6 gap-1 w-3/4 h-3/4 opacity-80">
                         {Array.from({length: 36}).map((_, i) => (
                           <div key={i} className={`bg-black rounded-sm ${Math.random() > 0.4 ? 'opacity-100' : 'opacity-0'}`} />
                         ))}
                       </div>
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer">
                         <span className="text-white font-medium flex items-center gap-2"><QrCode className="w-5 h-5"/> Enlarge</span>
                       </div>
                    </div>
                    <p className="text-xs text-center text-white/40 font-mono">Scan at pharmacy to dispense</p>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Save
                      </button>
                      <button className="flex-1 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </div>
                )}

                {selected.status === 'flagged' && (
                  <div className="p-4 rounded-xl bg-[#FF4D6D]/10 border border-[#FF4D6D]/30 flex flex-col items-center text-center gap-2">
                    <AlertTriangle className="w-8 h-8 text-[#FF4D6D]" />
                    <p className="text-sm text-[#FF4D6D] font-medium">Prescription Flagged</p>
                    <p className="text-xs text-[#FF4D6D]/70">This prescription has been flagged for potential anomaly or cryptographic signature mismatch. Contact your prescriber.</p>
                  </div>
                )}
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
