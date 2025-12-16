"use client";

import Link from "next/link";
import {
  Shield,
  Zap,
  Lock,
  Github,
  Clock,
  Ghost,
  Terminal,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      "> Initializing secure handshake...",
      "> Allocating ephemeral keys...",
      "> Connecting to edge node [ap-south-1]...",
      "> Status: ENCRYPTED",
      "> Waiting for user input...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs((prev) => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center relative overflow-hidden bg-[#020617] text-slate-300">
      {/* === Background Ambience === */}
      <div className="absolute inset-0 bg-grid -z-5 opacity-20" />
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* === LEFT COLUMN: Content === */}
          <div className="space-y-8 md:space-y-10 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] sm:text-xs font-mono text-cyan-400 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              V1.0 LIVE ON EDGE
            </div>

            {/* Typography */}
            <div className="space-y-6">
              <h1 className="font-extrabold tracking-tighter text-white leading-[0.9]">
                {/* Responsive Sizes: Start at 5xl, grow to 9xl */}
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-2">Ephemera.
                </span>
                <span className="block text-4xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 pb-2">
                  Zero Persistence.
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0 pt-2 border-none lg:border-l-2 lg:border-slate-800 lg:pl-6">
                Privacy-first real-time communication.{" "}
                <br className="hidden sm:block" />
                <span className="text-slate-200 font-medium">
                  No database. No logs. 100% Anonymous.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-sm transition-all hover:scale-105 shadow-[0_0_30px_-10px_rgba(34,211,238,0.6)] uppercase tracking-wider text-sm w-full sm:w-auto"
              >
                <Zap className="w-4 h-4" /> Start Session
              </Link>

              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-sm transition-all backdrop-blur-sm uppercase tracking-wider text-sm w-full sm:w-auto"
              >
                <Lock className="w-4 h-4 text-cyan-500" /> Join Room
              </Link>
            </div>

            {/* Mini Trust Signals */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" /> Open Source
              </div>
              <div className="h-1 w-1 bg-slate-700 rounded-full" />
              <div>AES-256 Ready</div>
            </div>
          </div>

          {/* === RIGHT COLUMN: Visual (The Terminal) === */}
          {/* Hidden on Mobile/Tablet, visible on Desktop (lg) */}
          <div className="hidden lg:block relative group mt-10 lg:mt-0">
            {/* Glow behind terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            {/* The Terminal Card */}
            <div className="relative bg-[#0a0f1e] border border-slate-800 rounded-lg p-6 font-mono text-sm shadow-2xl h-[400px] flex flex-col">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                <div className="ml-auto text-xs text-slate-500">
                  bash — 80x24
                </div>
              </div>

              {/* Terminal Content */}
              <div className="space-y-2 text-slate-300">
                <div className="text-slate-500 mb-4">
                  # Establishing secure connection...
                </div>

                {logs.map((log, i) => (
                  <div
                    key={i}
                    className="animate-in slide-in-from-left-2 fade-in duration-300"
                  >
                    <span className="text-cyan-500 mr-2">➜</span>
                    {log}
                  </div>
                ))}

                {logs.length === 5 && (
                  <div className="animate-pulse text-cyan-400 mt-4">
                    _ Cursor active
                  </div>
                )}
              </div>

              {/* Bottom Decoration */}
              <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between text-[10px] text-slate-600 uppercase tracking-widest">
                <span>Latency: 24ms</span>
                <span>Region: EDGE</span>
              </div>
            </div>
          </div>
        </div>

        {/* === FOOTER: Feature Grid === */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/50 border border-slate-800 overflow-hidden rounded-2xl">
          {/* Card 1 */}
          <div className="bg-[#020617] p-8 hover:bg-[#050a25] transition-colors group">
            <Clock className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Infinite Chat</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
Conversations remain active as long as participants stay connected.
There are no artificial session timers or message caps.            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#020617] p-8 hover:bg-[#050a25] transition-colors group">
            <Ghost className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Ghost Mode</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              You are just a random hash (`User-x92a`). No email, no IP logging,
              no identity linking.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#020617] p-8 hover:bg-[#050a25] transition-colors group">
            <Terminal className="w-8 h-8 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Edge Network</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Powered by Vercel Edge & Pusher. Messages route through the
              nearest server node to you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
