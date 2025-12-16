"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Key, Signal, AlertCircle, Hash } from "lucide-react";

export default function JoinPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) return;
    
    setIsLoading(true);
    setError("");

    try {
      // Simulate network handshake visual
      await new Promise(r => setTimeout(r, 600));

      const res = await fetch("/api/room/check", { 
        method: "POST", 
        body: JSON.stringify({ roomId }) 
      });
      
      if (!res.ok) {
        setError("INVALID_FREQUENCY: Room inactive or expired.");
        setIsLoading(false);
        return;
      }
      
      router.push(`/room/${roomId}`);
    } catch (err) {
      setError("CONNECTION_FAILED: Network unreachable.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-[#020617] text-slate-300">
      
      {/* === Background Ambience === */}
      <div className="absolute inset-0 bg-grid -z-10 opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-lg px-6 relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Join Channel</h1>
          <p className="text-slate-500 text-sm">Enter the encrypted room identifier.</p>
        </div>

        {/* === Main Interface Card === */}
        <div className="bg-[#0a0f1e]/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Card Header (Technical Bar) */}
          <div className="h-10 bg-black/50 border-b border-slate-800 flex items-center px-4 justify-between">
             <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500">
                <Signal className="w-3 h-3 animate-pulse" />
                <span>NET_ACTIVE</span>
             </div>
             <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Uplink V2.0
             </div>
          </div>

          <div className="p-8 space-y-8">
            
            <form onSubmit={handleJoin} className="space-y-6">
              
              {/* Input Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-3 h-3" /> Target Identifier
                </label>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. room-8293"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-black/40 border border-slate-800 rounded-xl py-4 pl-11 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-mono tracking-wider"
                    autoFocus
                  />
                  {/* Glowing border effect on focus */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-focus-within:ring-cyan-500/20 pointer-events-none" />
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3 text-red-400 text-xs font-mono animate-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading || !roomId}
                className="w-full group bg-white text-black font-bold py-4 px-4 rounded-xl transition-all hover:bg-cyan-50 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <span>ESTABLISH CONNECTION</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            {/* Footer Hint */}
            <div className="text-center">
               <p className="text-[10px] text-slate-600 font-mono">
                 SECURE HANDSHAKE PROTOCOL
               </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}