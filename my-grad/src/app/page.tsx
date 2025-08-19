"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProfileCard from "./ProfileCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[--color-black] to-[--color-gold] text-[--color-white]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20 space-y-20">
        {/* Hero Section */}
        <section className="grid items-center gap-10 md:grid-cols-2">
          {/* Profile Card */}
          <div className="relative w-full flex items-center justify-center py-2">
            <ProfileCard
              name="Rhuzzel L. Paramio"
              title="Software Engineer"
              handle="its.not.rhuzz"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/asset/profile.JPG"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
            />
          </div>

          {/* Right copy */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-sm">
              Graduation 2025
            </h1>
            <p className="mt-4 text-base md:text-lg">
              Pre-release launch: Sept 4 🎂 | Official Graduation: Nov 4 🎓
            </p>
            <p className="mt-2 text-sm/relaxed opacity-90">
              Rhuzzel Paramio — B.S. Computer Science (Software Engineering)
            </p>
          </div>
        </section>

        {/* Countdown */}
        <section id="countdown" className="rounded-2xl border border-white/20 bg-black/20 p-6 backdrop-blur">
          <h2 className="mb-4 text-center text-lg font-semibold md:text-left">
            Countdown to Nov 4, 2025, 6PM (Newport Performing Arts Theater)
          </h2>
          <Countdown />
        </section>

        {/* About */}
        <section id="about" className="max-w-3xl">
          <h2 className="mb-3 text-xl font-semibold">About</h2>
          <p className="text-sm opacity-95 md:text-base">
            I’m Rhuzzel Paramio, a 4th-year BSCSSE student at FEU Tech. This site
            celebrates my upcoming graduation and the journey that made it possible.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
              href="https://www.linkedin.com/in/rhuzzel-paramio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
              href="https://github.com/rhuzzel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
              href="mailto:rhuzzel.paramio@example.com"
              aria-label="Email"
            >
              Email
            </a>
            <div className="ml-auto">
              <div className="grid h-28 w-28 place-items-center rounded-lg border border-white/20 bg-white/10 text-xs opacity-80">
                QR code
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Rhuzzel Paramio
        </footer>
      </div>
    </div>
  );
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET = new Date("2025-11-04T18:00:00+08:00");

function useCountdown(targetDate: Date) {
  const initial = (): TimeLeft => {
    const now = Date.now();
    const diff = Math.max(0, targetDate.getTime() - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState<TimeLeft>(initial());
  useEffect(() => {
    const compute = (): TimeLeft => {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { days, hours, minutes, seconds };
    };
    const id = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Tick label="Days" value={days} />
      <Tick label="Hours" value={hours} pad />
      <Tick label="Minutes" value={minutes} pad />
      <Tick label="Seconds" value={seconds} pad />
    </div>
  );
}

function Tick({ label, value, pad }: { label: string; value: number; pad?: boolean }) {
  const display = pad ? String(value).padStart(2, "0") : String(value);
  return (
    <div className="rounded-xl bg-white/10 p-4 text-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={display}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-3xl font-bold tabular-nums tracking-tight md:text-4xl"
        >
          {display}
        </motion.div>
      </AnimatePresence>
      <div className="mt-1 text-xs uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}
