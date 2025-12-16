/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateRandomName } from "@/lib/utils";
import { Loader2, ArrowRight, Cpu, Shield, Clock, RefreshCw } from "lucide-react";

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("READY"); // For visual feedback

  useEffect(() => {
    // 1. Get or Generate User Identity
    let savedUser = localStorage.getItem("mercurius_user");
    if (!savedUser) {
      savedUser = generateRandomName();
      localStorage.setItem("mercurius_user", savedUser);
    }
    setUser(savedUser);
  }, []);

  const regenerateIdentity = () => {
    const newUser = generateRandomName();
    localStorage.setItem("mercurius_user", newUser);
    setUser(newUser);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    setStatus("ALLOCATING_EDGE_NODE...");
    
    try {
      // Artificial delay for "Cool Factor" (optional, remove setTimeout to go instant)
      await new Promise(r => setTimeout(r, 800)); 
      
      setStatus("GENERATING_KEYS...");
      const res = await fetch("/api/room/create", { method: "POST" });
      const data = await res.json();
      
      setStatus("REDIRECTING...");
      router.push(`/room/${data.roomId}`);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setStatus("ERROR_ABORTED");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-[#020617] text-slate-300">
      
      {/* === Background Ambience === */}
      <div className="absolute inset-0 bg-grid -z-10 opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-lg px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Initialize Session</h1>
          <p className="text-slate-500 text-sm">Configure your temporary secure channel.</p>
        </div>

        {/* === Main Interface Card === */}
        <div className="bg-[#0a0f1e]/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Card Header (Technical Bar) */}
          <div className="h-10 bg-black/50 border-b border-slate-800 flex items-center px-4 justify-between">
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
             </div>
             <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Protocol V2.0
             </div>
          </div>

          <div className="p-8 space-y-8">
            
            {/* Identity Section */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                 <span>Identity Assignment</span>
                 <button onClick={regenerateIdentity} className="text-cyan-500 hover:text-white transition-colors" title="Reroll Identity">
                    <RefreshCw className="w-3 h-3" />
                 </button>
              </label>
              
              <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl group hover:border-cyan-500/30 transition-all">
                <div className="relative">
                   <div className="w-12 h-12 rounded-full bg-white overflow-hidden ring-2 ring-slate-800 group-hover:ring-cyan-500/50 transition-all">
                      <img 
                        src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user}`} 
                        alt="avatar" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0f1e]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-mono mb-0.5">ALIAS</p>
                  <p className="text-white font-medium truncate font-mono">{user}</p>
                </div>
              </div>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-slate-900/30 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-cyan-500/10 p-2 rounded-md">
                     <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                     <p className="text-[10px] text-slate-500 uppercase">Duration</p>
                     <p className="text-s font-bold text-slate-300">&infin;</p>
                  </div>
               </div>
               
               <div className="bg-slate-900/30 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-md">
                     <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                     <p className="text-[10px] text-slate-500 uppercase">Security</p>
                     <p className="text-xs font-bold text-slate-300">Ephemeral</p>
                  </div>
               </div>
            </div>

            {/* Status Log (Only visible when loading) */}
            {isLoading && (
               <div className="font-mono text-xs text-cyan-500 flex items-center gap-2 animate-pulse">
                  <span className="text-lg">›</span> {status}
               </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleCreate}
              disabled={isLoading}
              className="w-full group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Cpu className="w-5 h-5 group-hover:text-cyan-200 transition-colors" />
                  <span>INITIALIZE ROOM</span>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}