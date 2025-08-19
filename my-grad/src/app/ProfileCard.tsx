"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

export type ProfileCardProps = {
  name: string;
  title: string;
  handle: string;
  status?: string; // e.g., "Online"
  contactText?: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
};

export default function ProfileCard({
  name,
  title,
  handle,
  status = "Online",
  contactText = "Contact Me",
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches);
  }, []);

  const allowTilt = useMemo(() => {
    if (!enableTilt) return false;
    if (isTouch && !enableMobileTilt) return false;
    return true;
  }, [enableTilt, enableMobileTilt, isTouch]);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!allowTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * -12; // deg
    const ry = (px - 0.5) * 12; // deg
    cardRef.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="group relative mx-auto w-[360px] md:w-[420px] select-none"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Outer Glow */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(34,211,238,0.18),transparent),radial-gradient(30%_60%_at_0%_50%,rgba(34,211,238,0.15),transparent)] blur-2xl" />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[28px] ring-1 ring-cyan-300/40 bg-gradient-to-b from-slate-800/50 to-slate-950/70 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.16)] transition-transform duration-200 will-change-transform"
        style={{ transform: "perspective(900px)" }}
        aria-label="Profile card"
      >
        {/* Top Title */}
        {showUserInfo && (
          <div className="absolute top-6 inset-x-6 z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm">{name}</h3>
            <p className="mt-1 text-sm md:text-base text-white/80">{title}</p>
          </div>
        )}

        {/* Decorative Pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 24px 24px, rgba(255,255,255,0.4) 0, transparent 2px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Hero Portrait */}
        <div className="relative h-[540px]">
          <Image
            src={avatarUrl}
            alt={`${name} portrait`}
            fill
            sizes="(min-width: 768px) 420px, 360px"
            className="object-cover object-bottom scale-105 select-none"
            priority
          />
          {/* Blue tint and bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-slate-900/20 to-black/70" />
        </div>

        {/* Glassy Bottom Bar */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md ring-1 ring-white/15">
            {/* Handle + status */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/20">
                <Image src={avatarUrl} alt={`${name} avatar`} width={32} height={32} className="h-full w-full object-cover" />
                <span className="absolute -right-0 -bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" title={status} aria-label={status} />
              </div>
              <div className="min-w-0 text-sm">
                <div className="truncate opacity-95">@{handle}</div>
                <div className="text-xs opacity-75">{status}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onContactClick?.()}
              className="inline-flex items-center justify-center rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
            >
              {contactText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
