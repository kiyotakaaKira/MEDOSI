"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScanLine, Upload } from "lucide-react";

export function QRScanner({ onScan }: { onScan: (token: string) => void }) {
  const [scanning, setScanning] = useState(true);

  // Mock auto-scan for hackathon demo
  useEffect(() => {
    if (scanning) {
      const t = setTimeout(() => {
        setScanning(false);
        onScan("mock-valid-qr-token");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [scanning, onScan]);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square border-2 border-white/10 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
      
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-[#29F0E0] rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-[#29F0E0] rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-[#29F0E0] rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-[#29F0E0] rounded-br-lg" />

      {/* Scanner Line */}
      <motion.div 
        animate={{ y: ["-100%", "100%", "-100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-[#29F0E0] shadow-[0_0_20px_rgba(41,240,224,0.8)] z-10"
      />

      <ScanLine className="w-20 h-20 text-white/20 mb-4" />
      <p className="text-white/50 text-sm font-medium tracking-wide">Align QR Code</p>

      <button className="absolute bottom-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-xs flex items-center gap-2 transition-colors">
        <Upload className="w-3 h-3" /> Upload Image
      </button>
    </div>
  );
}
