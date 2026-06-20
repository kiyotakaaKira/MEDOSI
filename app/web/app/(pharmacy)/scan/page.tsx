"use client";
import React, { useState } from "react";
import { QRScanner } from "../../../components/QRScanner";
import { useRouter } from "next/navigation";
import { GlassPanel } from "@healthmesh/ui";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, ShieldAlert } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const [scanState, setScanState] = useState<"scanning" | "verifying" | "success" | "error">("scanning");

  const handleScan = (token: string) => {
    setScanState("verifying");
    // Simulate cryptographic verification
    setTimeout(() => {
      setScanState("success");
    }, 2500);
  };

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto min-h-screen flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-tight text-white mb-2">Cryptographic Scanner</h1>
        <p className="text-white/50 text-lg">Verify prescription authenticity via signed QR token.</p>
      </div>

      <AnimatePresence mode="wait">
        {scanState === "scanning" && (
          <motion.div key="scan" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md">
            <GlassPanel className="p-8 pb-12 flex flex-col items-center justify-center border-dashed border-white/20">
               <QRScanner onScan={handleScan} />
            </GlassPanel>
          </motion.div>
        )}

        {scanState === "verifying" && (
          <motion.div key="verifying" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md">
            <GlassPanel accentColor="blue" className="p-12 text-center flex flex-col items-center justify-center">
               <div className="relative w-24 h-24 mb-6">
                 <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#2E6FFF]" 
                 />
                 <motion.div 
                   animate={{ rotate: -360 }} 
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#2E6FFF]/50" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <ShieldCheck className="w-8 h-8 text-[#2E6FFF] animate-pulse" />
                 </div>
               </div>
               <h3 className="text-xl font-medium text-white mb-2">Verifying Cryptographic Signature</h3>
               <p className="text-sm text-white/50 font-mono">Checking against HealthMesh Network...</p>
            </GlassPanel>
          </motion.div>
        )}

        {scanState === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg">
            <GlassPanel accentColor="green" className="p-10 text-center flex flex-col items-center border-[#2ED9A3]/30 shadow-[0_0_50px_rgba(46,217,163,0.15)]">
               <div className="w-20 h-20 rounded-full bg-[#2ED9A3]/10 flex items-center justify-center mb-6 border border-[#2ED9A3]/30">
                 <ShieldCheck className="w-10 h-10 text-[#2ED9A3]" />
               </div>
               <h2 className="text-2xl font-medium text-white mb-2">Signature Verified</h2>
               <div className="bg-black/40 px-4 py-2 rounded border border-white/10 mb-8 inline-block">
                 <p className="text-xs text-[#2ED9A3] font-mono">Hash: 0x9f86d081...a3bf4f1b</p>
               </div>
               <p className="text-white/60 mb-8">
                 The prescription capsule is cryptographically valid and has not been tampered with. It was signed by a verified provider.
               </p>
               
               <button 
                 onClick={() => router.push('/dispense')}
                 className="w-full py-4 bg-[#2ED9A3] text-black font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
               >
                 Proceed to Fulfillment <ArrowRight className="w-4 h-4" />
               </button>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
