"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Pill, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from "../../store/useStore";

export function ConsentNetworkVisual() {
  const grants = useStore(state => state.grants);
  const activeGrants = grants.filter(g => g.status === 'approved');

  // Static central node
  const centerNode = { id: 'patient', x: 50, y: 50 };

  // Calculate positions for connected entities
  const nodes = activeGrants.map((grant, index) => {
    const angle = (index / Math.max(1, activeGrants.length)) * Math.PI * 2 - Math.PI / 2;
    const radius = 35; // % from center
    return {
      ...grant,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-xl overflow-hidden bg-black/20 border border-white/5 flex items-center justify-center p-8">
      {activeGrants.length === 0 ? (
        <div className="text-white/40 flex flex-col items-center">
          <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
          <p>No active consent connections.</p>
        </div>
      ) : (
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#29F0E0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2E6FFF" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${node.id}`}
              x1={`${centerNode.x}%`}
              y1={`${centerNode.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="url(#linkGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </svg>
      )}

      {/* Center Node (Patient) */}
      <motion.div 
        className="absolute w-16 h-16 bg-gradient-to-tr from-[#29F0E0] to-[#2E6FFF] rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(41,240,224,0.3)]"
        style={{ left: `calc(${centerNode.x}% - 32px)`, top: `calc(${centerNode.y}% - 32px)` }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        <div className="w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-[#29F0E0]" />
        </div>
      </motion.div>

      {/* Connected Nodes */}
      {nodes.map((node, i) => {
        let Icon = Building2;
        if (node.requester.toLowerCase().includes('pharmacy')) Icon = Pill;
        if (node.requester.toLowerCase().includes('insurance')) Icon = Activity;

        return (
          <motion.div
            key={`node-${node.id}`}
            className="absolute flex flex-col items-center gap-2 z-10"
            style={{ left: `calc(${node.x}% - 24px)`, top: `calc(${node.y}% - 24px)` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.5 + i * 0.1 }}
          >
            <div className="w-12 h-12 bg-[#2E6FFF]/20 border border-[#2E6FFF]/50 rounded-xl flex items-center justify-center backdrop-blur-md relative group">
              <Icon className="w-5 h-5 text-[#2E6FFF]" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#2ED9A3] rounded-full flex items-center justify-center border-2 border-black">
                <CheckCircle2 className="w-3 h-3 text-black" />
              </div>
            </div>
            <div className="bg-black/80 px-3 py-1.5 rounded text-xs text-white whitespace-nowrap border border-white/10 backdrop-blur-md">
              {node.requester}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
