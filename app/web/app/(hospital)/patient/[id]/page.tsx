"use client";
import React, { useEffect, useState } from "react";
import { GlassPanel } from "@healthmesh/ui";
import { FileText, Clock, ArrowLeft, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("23h 45m 12s");

  // Mock countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      // In reality, this calculates difference between expires_at and now.
      setTimeLeft(`23h 45m ${new Date().getSeconds()}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-white mb-1">Patient Record: {params.id}</h1>
          <p className="text-white/50">Read-only view constrained by active consent grant.</p>
        </div>
        
        {/* Countdown Badge */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[#2ED9A3]">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-mono font-medium">{timeLeft}</span>
          </div>
          <span className="text-xs text-white/30 mt-2 uppercase tracking-widest">Until Auto-Revoke</span>
        </div>
      </div>

      {/* Task 13 Break-Glass Placeholder (will be added later) */}
      <div className="mb-8 p-4 border border-[#FF4D6D]/20 bg-[#FF4D6D]/5 rounded-xl flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-[#FF4D6D] w-5 h-5" />
          <div>
            <h4 className="text-[#FF4D6D] font-medium text-sm">Emergency Protocol</h4>
            <p className="text-white/40 text-xs">Break-glass access for critical care.</p>
          </div>
        </div>
        <button className="px-4 py-1.5 border border-[#FF4D6D]/40 text-[#FF4D6D] rounded text-sm hover:bg-[#FF4D6D]/10 transition-colors">
          Declare Emergency
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassPanel className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <FileText className="text-[#2E6FFF] w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Complete Blood Count (CBC)</h3>
            <p className="text-white/50 text-sm mb-3">Issued: 2026-05-20 by Apollo Labs</p>
            <button className="text-sm text-[#2E6FFF] hover:underline">View Document</button>
          </div>
        </GlassPanel>

        <GlassPanel className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <FileText className="text-[#2E6FFF] w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">MRI Scan Results</h3>
            <p className="text-white/50 text-sm mb-3">Issued: 2026-04-10 by General Hospital</p>
            <button className="text-sm text-[#2E6FFF] hover:underline">View Document</button>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
