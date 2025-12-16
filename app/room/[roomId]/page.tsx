"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import Pusher from "pusher-js";
import { generateRandomName } from "@/lib/utils";
import { Send, Clock, Copy, LogOut, Shield, Wifi, Terminal } from "lucide-react";

interface Message {
  text: string;
  username: string;
  timestamp: number;
}

export default function ChatRoom() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); 
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Get Identity
    let savedUser = localStorage.getItem("mercurius_user");
    if (!savedUser) {
      savedUser = generateRandomName();
      localStorage.setItem("mercurius_user", savedUser);
    }
    setUser(savedUser);

    // 2. Subscribe to PUBLIC channel (No Auth required)
    const channelName = `room-${roomId}`;
    const channel = pusherClient.subscribe(channelName);

    // 3. Bind Event
    const messageHandler = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    channel.bind("incoming-message", messageHandler);

    const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      channel.unbind("incoming-message", messageHandler);
      pusherClient.unsubscribe(channelName);
      clearInterval(timer);
    };
  }, [roomId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const textToSend = input;
    setInput("");
    setIsSending(true);

    try {
      await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          text: textToSend,
          roomId,
          username: user,
        }),
      });
    } catch (error) {
      console.error("Failed to send", error);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-300 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid -z-10 opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      {/* Header */}
      <header className="px-4 py-3 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center shadow-lg shadow-black/20">
        
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-cyan-500/10 rounded-lg border border-cyan-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">Ephemera</span>
                <span className="text-[10px] font-mono text-cyan-500 flex items-center gap-1">
                    <Wifi className="w-2 h-2" /> Connected
                </span>
            </div>
        </div>
        
        {/* <div className="hidden sm:flex bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1 items-center gap-2">
            <Clock className="w-3 h-3 text-red-400" />
            <span className="font-mono text-xs text-red-400">{formatTime(timeLeft)}</span>
        </div> */}

        <div className="flex gap-2">
          <button onClick={copyToClipboard} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white" title="Copy ID">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={() => router.push('/')} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-slate-400 hover:text-red-400" title="Disconnect">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth max-w-4xl mx-auto w-full">
        
        <div className="flex justify-center py-4">
            <div className="text-[10px] font-mono text-slate-600 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                SESSION ID: {roomId}
            </div>
        </div>

        {messages.length === 0 && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-700 opacity-50 select-none">
            <Terminal className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-mono text-xs tracking-widest uppercase">Channel Empty</p>
            <p className="text-[10px] mt-2">Waiting for secure signals...</p>
          </div>
        )}
        
        {messages.map((msg, i) => {
          const isMe = msg.username === user;
          const isSequence = i > 0 && messages[i - 1].username === msg.username;
          
          return (
            <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"} group mb-2`}>
              {!isSequence && (
                <span className={`text-[10px] mb-1 font-mono opacity-50 px-1 flex items-center gap-1 ${isMe ? "flex-row-reverse text-cyan-400" : "flex-row text-slate-500"}`}>
                  {isMe ? "YOU" : msg.username.split('-')[1] || "AGENT"}
                  <span className="text-[8px] opacity-50">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </span>
              )}
              <div 
                className={`relative max-w-[80%] sm:max-w-[60%] text-sm px-4 py-2 shadow-sm transition-all break-words
                ${isMe 
                  ? "bg-cyan-600/90 text-white rounded-lg rounded-tr-none border border-cyan-500/50" 
                  : "bg-[#1e293b]/80 text-slate-200 rounded-lg rounded-tl-none border border-slate-700/50"
                }
                ${isSequence ? "mt-0.5" : "mt-0"} 
                `}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#020617]/90 border-t border-slate-800/50 backdrop-blur-lg">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative flex items-center gap-2">
          <div className="flex-1 relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
             <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                disabled={isSending}
                className="relative w-full bg-[#0b1221] text-slate-200 placeholder:text-slate-600 border border-slate-800 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500/50 focus:bg-[#0f172a] transition-all font-mono text-sm disabled:opacity-50"
                autoFocus
             />
          </div>
          <button 
            type="submit" 
            disabled={!input.trim() || isSending}
            className="bg-slate-800 hover:bg-cyan-600 text-slate-400 hover:text-white p-4 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-slate-800 disabled:cursor-not-allowed group"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}