"use client";
import React, { useState } from "react";
import { GlassPanel } from "@healthmesh/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, Pill, FileSignature, ShieldAlert, Upload, ShieldCheck, Download, Trash2, Eye } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { toast } from "sonner";
import { DataTable } from "../../../components/DataTable";

export default function VaultPage() {
  const records = useStore(state => state.records);
  const uploadRecord = useStore(state => state.uploadRecord);
  const deleteRecord = useStore(state => state.deleteRecord);

  const [filter, setFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filteredRecords = records.filter(r => 
    (filter === "all" || r.category.toLowerCase().includes(filter) || (filter === 'prescription' && r.category === 'prescription'))
  );

  const handleUpload = async () => {
    setIsUploading(true);
    toast("Encrypting file...");
    await new Promise(r => setTimeout(r, 1000));
    
    uploadRecord({
      title: "New Retinal Scan",
      category: "Imaging",
      issuer: "EyeCare Clinic",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      encrypted: true
    });
    
    toast.success("Record uploaded to vault successfully");
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    deleteRecord(id);
    setSelectedRecord(null);
    toast.success("Record deleted permanently");
  };

  const columns = [
    {
      header: "Record Title",
      accessorKey: "title",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
            {item.category.toLowerCase().includes('lab') ? <FileText className="w-4 h-4 text-blue-400" /> : 
             item.category.toLowerCase().includes('allerg') ? <ShieldAlert className="w-4 h-4 text-red-400" /> : 
             item.category.toLowerCase().includes('insur') ? <FileSignature className="w-4 h-4 text-green-400" /> : 
             <Pill className="w-4 h-4 text-cyan-400" />}
          </div>
          <span className="font-medium text-white">{item.title}</span>
        </div>
      ),
      sortable: true
    },
    { header: "Category", accessorKey: "category", sortable: true, cell: (item: any) => <span className="capitalize">{item.category}</span> },
    { header: "Issuer", accessorKey: "issuer", sortable: true },
    { header: "Date Added", accessorKey: "date", sortable: true },
    {
      header: "Status",
      accessorKey: "encrypted",
      cell: () => (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-[#29F0E0]/30 text-[#29F0E0] text-[10px] font-mono w-fit">
          <Lock className="w-3 h-3" /> SEALED
        </div>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => (
        <button 
          onClick={() => setSelectedRecord(item.id)}
          className="text-white/40 hover:text-white px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto min-h-screen flex flex-col md:flex-row gap-8">
      {/* Sidebar Metrics */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-white mb-2">Health Vault</h1>
          <p className="text-white/50 text-sm">Cryptographically secured repository.</p>
        </div>
        
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full py-3 bg-gradient-to-r from-[#29F0E0] to-[#2E6FFF] text-black font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(41,240,224,0.2)] disabled:opacity-50"
        >
          {isUploading ? <Upload className="w-4 h-4 animate-bounce" /> : <Upload className="w-4 h-4" />}
          {isUploading ? "Encrypting..." : "Upload Record"}
        </button>

        <GlassPanel className="p-5 flex flex-col gap-4">
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2">Storage</h3>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#29F0E0] w-[15%]"></div>
            </div>
            <p className="text-white/40 text-xs mt-2">150 MB / 1 GB Used</p>
          </div>
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2">Encryption Status</h3>
            <div className="flex items-center gap-2 text-[#2ED9A3] text-sm font-medium">
              <ShieldCheck className="w-4 h-4" /> AES-256-GCM Active
            </div>
          </div>
        </GlassPanel>

        <div className="flex flex-col gap-2">
          <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2 px-2">Categories</h3>
          {['all', 'lab', 'imaging', 'immunization'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm transition-colors capitalize ${filter === cat ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 gap-6">
        <DataTable 
          data={filteredRecords}
          columns={columns}
          searchPlaceholder="Search records by title or issuer..."
          searchableKey="title"
        />
      </div>

      {/* Record Preview / Metadata Sidebar */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full md:w-80 shrink-0"
          >
            <GlassPanel className="p-6 sticky top-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-white font-medium">Record Details</h3>
                <button onClick={() => setSelectedRecord(null)} className="text-white/40 hover:text-white">✕</button>
              </div>
              
              {(() => {
                const r = records.find(x => x.id === selectedRecord);
                if (!r) return null;
                return (
                  <>
                    <div className="w-full aspect-video bg-black/40 rounded-lg border border-white/5 flex flex-col items-center justify-center text-white/20 mb-6 group cursor-pointer hover:border-[#29F0E0]/50 transition-colors">
                      <Eye className="w-8 h-8 mb-2 group-hover:text-[#29F0E0] transition-colors" />
                      <span className="text-xs">Tap to decrypt & view</span>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Title</p>
                        <p className="text-sm text-white">{r.title}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Issuer</p>
                        <p className="text-sm text-white">{r.issuer}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Date Added</p>
                        <p className="text-sm text-white font-mono">{r.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">Encryption</p>
                        <p className="text-sm text-[#29F0E0] font-mono flex items-center gap-2"><Lock className="w-3 h-3" /> AES-256-GCM</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button onClick={() => toast.success("File decrypted and downloaded.")} className="w-full py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download Decrypted
                      </button>
                      <button onClick={() => handleDelete(r.id)} className="w-full py-2.5 border border-[#FF4D6D]/30 text-[#FF4D6D] rounded-lg text-sm font-medium hover:bg-[#FF4D6D]/10 transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete Record
                      </button>
                    </div>
                  </>
                );
              })()}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
