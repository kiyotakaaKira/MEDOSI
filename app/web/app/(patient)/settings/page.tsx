"use client";
import React, { useState } from "react";
import { GlassPanel, motionVariants } from "@healthmesh/ui";
import { motion } from "framer-motion";
import { User, Shield, AlertTriangle, Users, Key, Smartphone, Lock, Activity, ToggleLeft, ToggleRight } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "emergency" | "delegated">("profile");

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto min-h-screen">
      <header className="mb-10">
        <motion.div initial="initial" animate="animate" variants={motionVariants.staggerContainer}>
          <motion.p variants={motionVariants.resolveIn} className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#29F0E0]/80 mb-2">Account Management</motion.p>
          <motion.h1 variants={motionVariants.resolveIn} className="text-4xl font-light text-white tracking-tight">Security & Settings</motion.h1>
        </motion.div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
           <button 
             onClick={() => setActiveTab('profile')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-[#29F0E0]/10 text-[#29F0E0]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
           >
             <User className="w-5 h-5" /> Profile & Crypto
           </button>
           <button 
             onClick={() => setActiveTab('emergency')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'emergency' ? 'bg-[#FF4D6D]/10 text-[#FF4D6D]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
           >
             <AlertTriangle className="w-5 h-5" /> Emergency Access
           </button>
           <button 
             onClick={() => setActiveTab('delegated')}
             className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'delegated' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
           >
             <Users className="w-5 h-5" /> Delegated Consent
           </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-6">
                <GlassPanel className="p-6">
                  <h2 className="text-xl font-medium text-white mb-6">Patient Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Full Name</label>
                      <input type="text" defaultValue="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[#29F0E0]/50" />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Vault ID</label>
                      <input type="text" defaultValue="1111-1111" disabled className="w-full bg-white/5 border border-transparent rounded-lg py-2.5 px-4 text-white/50 cursor-not-allowed font-mono" />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Date of Birth</label>
                      <input type="date" defaultValue="1984-05-12" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[#29F0E0]/50" />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Phone</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-[#29F0E0]/50" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 bg-[#29F0E0] text-black font-medium rounded-lg">Save Changes</button>
                  </div>
                </GlassPanel>

                <GlassPanel className="p-6">
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2"><Key className="w-5 h-5 text-[#2ED9A3]"/> Cryptographic Security</h2>
                  
                  <div className="p-4 rounded-xl border border-[#2ED9A3]/30 bg-[#2ED9A3]/5 mb-6">
                    <div className="flex items-center gap-4">
                      <Shield className="w-8 h-8 text-[#2ED9A3]" />
                      <div>
                        <h3 className="text-white font-medium">Device Enclave Active</h3>
                        <p className="text-white/50 text-sm">Your private key is secured in your device's secure enclave (WebCrypto API). It never leaves your device.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-white/40" />
                        <div>
                          <p className="text-white font-medium">This Device (Current)</p>
                          <p className="text-white/40 text-xs">MacBook Pro • Last used: Just now</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#2ED9A3] border border-[#2ED9A3]/30 px-2 py-1 rounded">Authorized</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-white/10 pt-6">
                     <button className="text-[#FF4D6D] text-sm font-medium hover:underline flex items-center gap-2">
                       <Lock className="w-4 h-4"/> Revoke all other devices
                     </button>
                  </div>
                </GlassPanel>
              </div>
            )}

            {activeTab === 'emergency' && (
              <div className="flex flex-col gap-6">
                 <GlassPanel accentColor="red" className="p-6">
                   <div className="flex items-start gap-4 mb-8">
                     <div className="w-12 h-12 rounded-xl bg-[#FF4D6D]/10 flex items-center justify-center border border-[#FF4D6D]/30 shrink-0">
                       <AlertTriangle className="w-6 h-6 text-[#FF4D6D]" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-light text-white mb-2">Break-Glass Protocol</h2>
                       <p className="text-white/60 leading-relaxed">
                         In life-or-death situations where you are unconscious or unable to provide consent, you can pre-authorize certified hospitals to bypass your encryption locks. This action is heavily audited and instantly notifies your emergency contacts.
                       </p>
                     </div>
                   </div>

                   <div className="p-6 border border-[#FF4D6D]/20 rounded-xl bg-[#FF4D6D]/5 flex justify-between items-center mb-8">
                     <div>
                       <h3 className="text-white font-medium text-lg">Emergency Access Enabled</h3>
                       <p className="text-white/50 text-sm">Certified Level-1 Trauma Centers can access your vault.</p>
                     </div>
                     <ToggleRight className="w-10 h-10 text-[#FF4D6D] cursor-pointer" />
                   </div>

                   <h3 className="text-white font-medium mb-4">Pre-Authorized Institutions</h3>
                   <div className="space-y-3 mb-8">
                     {['Apollo Hospital', 'Mercy General', 'UCSF Medical Center'].map(h => (
                       <div key={h} className="flex justify-between items-center p-3 border border-white/10 rounded-lg bg-white/5">
                         <p className="text-white text-sm">{h}</p>
                         <button className="text-white/40 hover:text-[#FF4D6D]">Remove</button>
                       </div>
                     ))}
                     <button className="w-full py-3 border border-dashed border-white/20 rounded-lg text-white/50 text-sm hover:bg-white/5 hover:text-white transition-colors">
                       + Add Institution
                     </button>
                   </div>
                   
                   <div className="pt-6 border-t border-white/10">
                     <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                       <Activity className="w-4 h-4 text-[#F59E0B]" /> Audit Requirements
                     </h3>
                     <p className="text-white/50 text-sm mb-2">If break-glass is triggered:</p>
                     <ul className="list-disc list-inside text-white/50 text-sm space-y-1 ml-2">
                       <li>Full audit log of the accessing physician is recorded immutably.</li>
                       <li>Delegated contacts are immediately notified via SMS.</li>
                       <li>Access automatically revokes after 24 hours.</li>
                     </ul>
                   </div>
                 </GlassPanel>
              </div>
            )}

            {activeTab === 'delegated' && (
              <div className="flex flex-col gap-6">
                 <GlassPanel accentColor="amber" className="p-6">
                   <div className="flex items-start gap-4 mb-8">
                     <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center border border-[#F59E0B]/30 shrink-0">
                       <Users className="w-6 h-6 text-[#F59E0B]" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-light text-white mb-2">Delegated Consent</h2>
                       <p className="text-white/60 leading-relaxed">
                         Assign trusted family members or medical proxies the ability to approve or deny consent requests on your behalf.
                       </p>
                     </div>
                   </div>

                   <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center p-5 border border-white/10 rounded-xl bg-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">JD</div>
                          <div>
                            <p className="text-white font-medium">Jane Doe (Spouse)</p>
                            <p className="text-white/40 text-xs mt-1">Full Proxy Access</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 rounded text-xs">Active</span>
                          <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 text-white/60 text-xs">Edit</button>
                        </div>
                     </div>
                   </div>

                   <button className="px-5 py-3 bg-[#F59E0B] text-black font-medium rounded-xl text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                     + Add Delegate
                   </button>
                 </GlassPanel>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
