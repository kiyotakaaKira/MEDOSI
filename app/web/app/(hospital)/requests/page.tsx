"use client";
import React, { useState } from "react";
import { GlassPanel } from "@healthmesh/ui";
import { Plus, Clock, CheckCircle2 } from "lucide-react";

export default function RequestsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 max-w-5xl mx-auto h-full">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">Consent Requests</h1>
          <p className="text-white/50 text-lg">Manage data access requests for patients.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-[#2E6FFF] text-white font-medium rounded-full hover:bg-[#2E6FFF]/90 shadow-[0_0_20px_rgba(46,111,255,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Mock Active Request */}
        <GlassPanel accentColor="cyan" className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-medium text-white">John Doe</h3>
              <span className="text-xs font-mono text-white/40">ID: 1234-5678</span>
            </div>
            <p className="text-sm text-white/60">Purpose: Surgical Consultation. Scope: Lab Reports, Allergies.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[#29F0E0] text-sm font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Active</p>
              <p className="text-xs text-white/40 mt-1">Expires in 23h 45m</p>
            </div>
            <button className="px-4 py-2 border border-white/10 rounded-lg text-white text-sm hover:bg-white/5 transition-colors">
              View Records
            </button>
          </div>
        </GlassPanel>

        {/* Mock Pending Request */}
        <GlassPanel className="flex items-center justify-between opacity-70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-medium text-white">Jane Smith</h3>
              <span className="text-xs font-mono text-white/40">ID: 9876-5432</span>
            </div>
            <p className="text-sm text-white/60">Purpose: Second Opinion. Scope: Prescriptions.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/60 text-sm font-medium flex items-center gap-1"><Clock className="w-4 h-4" /> Pending</p>
              <p className="text-xs text-white/40 mt-1">Requested 2h ago</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <GlassPanel accentColor="blue" className="w-full max-w-md">
            <h2 className="text-xl font-medium text-white mb-6">Request Data Access</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-white/50 uppercase block mb-1">Patient ID</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#2E6FFF]/50" />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase block mb-1">Purpose</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#2E6FFF]/50" />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase block mb-1">Duration</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#2E6FFF]/50">
                  <option>24 Hours</option>
                  <option>1 Week</option>
                  <option>1 Month</option>
                </select>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-[#2E6FFF] text-white rounded-lg hover:opacity-90 shadow-[0_0_20px_rgba(46,111,255,0.3)] transition-opacity">
                  Send Request
                </button>
              </div>
            </form>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
