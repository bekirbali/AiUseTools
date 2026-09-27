"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onCopied?: () => void;
}

export default function CopyButton({
  textToCopy,
  label = "Kopyala",
  className = "",
  size = "sm",
  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      if (onCopied) onCopied();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      if (onCopied) onCopied();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs gap-2",
    lg: "px-4 py-2 text-sm gap-2",
  }[size];

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Metin panoya kopyalandı" : `${label} - panoya kopyala`}
      className={`inline-flex items-center justify-center font-mono font-medium rounded transition-colors duration-200 cursor-pointer select-none border focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
        copied
          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          : "bg-white/[0.05] hover:bg-white/[0.1] border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-cyan-200"
      } ${sizeClasses} ${className}`}
      title="Panoya kopyala"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-50 duration-150" aria-hidden="true" />
          <span>KOPYALANDI</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
