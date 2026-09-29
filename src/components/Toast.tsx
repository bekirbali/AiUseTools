"use client";

import { useEffect, useRef } from "react";
import { Sparkles, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 5000 }: ToastProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg glass-panel-elevated border border-cyan-500/40 text-cyan-100 shadow-[0_10px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
        <Sparkles className="w-4 h-4" aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
          [İŞLEM BAŞARILI]
        </span>
        <span className="text-sm font-sans text-zinc-200">{message}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Bildirimi kapat"
        className="ml-3 p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
