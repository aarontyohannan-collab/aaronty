import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Terminal, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-primary/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Logo size="lg" showText={false} />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>ERROR CODE: 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="font-heading text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-electric-secondary to-electric-primary tracking-tighter">
          404
        </h1>

        <p className="font-heading text-xl sm:text-2xl font-bold text-white">
          Coordinates Not Found in Computational Matrix
        </p>

        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          The line of code you requested could not be resolved. It may have been
          moved, compiled into another block, or is awaiting future implementation.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-primary to-electric-secondary text-white font-semibold text-xs sm:text-sm shadow-glow-sm hover:brightness-110 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Base (Home)</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-card border border-white/10 hover:border-electric-secondary/40 text-text-main text-xs sm:text-sm font-medium transition-colors"
          >
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
