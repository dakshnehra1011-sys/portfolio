"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiArrowRight, FiCode, FiCpu, FiMicOff, FiMic } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks, SiPython } from "react-icons/si";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin" />
      <p className="text-slate-400 text-sm font-medium">Loading 3D Avatar...</p>
    </div>
  ),
});

const socialLinks = [
  { icon: FiGithub,        href: "https://github.com/dakshnehra1011-sys",              label: "GitHub" },
  { icon: FiLinkedin,      href: "https://www.linkedin.com/in/daksh-nehra",            label: "LinkedIn" },
  { icon: SiLeetcode,      href: "https://leetcode.com/u/Zw5DEF57UI/",                label: "LeetCode" },
  { icon: SiGeeksforgeeks, href: "https://www.geeksforgeeks.org/profile/dakshnehdcbn", label: "GFG" },
];

const floatingBadges = [
  { icon: SiPython, label: "Python", color: "#3776AB", bg: "#e8f0fb", x: "76%", y: "14%", delay: 0.4 },
  { icon: FiCpu,    label: "ML / AI", color: "#8B5CF6", bg: "#f0ebff", x: "4%",  y: "70%", delay: 1.2 },
];

const stats = [
  { value: "200+", label: "DSA Solved",  color: "text-blue-600" },
  { value: "3",    label: "AI Projects", color: "text-violet-600" },
  { value: "1",    label: "Internship",  color: "text-cyan-600" },
  { value: "3rd",  label: "Hackathon",   color: "text-amber-600" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const [agentSpeaking, setAgentSpeaking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 2 + 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "rgba(99,102,241," + ((1 - d / 130) * 0.12) + ")"; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.3)"; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const onDone = () => setAgentSpeaking(false);
    window.addEventListener("agent:done", onDone);
    return () => window.removeEventListener("agent:done", onDone);
  }, []);

  const handleAgentClick = () => {
    if (agentSpeaking) {
      window.dispatchEvent(new CustomEvent("agent:stop"));
      setAgentSpeaking(false);
    } else {
      window.dispatchEvent(new CustomEvent("agent:speak"));
      setAgentSpeaking(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <section id="home" onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f8faff]"
    >
      <div className="absolute inset-0 dot-grid opacity-50" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <motion.div style={{ x: springX, y: springY }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/30 to-violet-200/20 blur-3xl pointer-events-none" />
      <motion.div style={{ x: springX, y: springY }}
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-cyan-200/25 to-blue-200/20 blur-3xl pointer-events-none" />

      {floatingBadges.map((badge, i) => (
        <motion.div key={badge.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 1.5 + i * 0.2, duration: 0.5 },
            scale:   { delay: 1.5 + i * 0.2, duration: 0.5 },
            y: { delay: 1.5 + i * 0.2, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border border-white/80 text-xs font-semibold pointer-events-none"
          style={{ left: badge.x, top: badge.y, background: badge.bg, color: badge.color, zIndex: 5 }}
        >
          <badge.icon size={13} style={{ color: badge.color }} />
          {badge.label}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* ALL screen sizes: side-by-side grid. Avatar right, text left */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* TEXT — always left column */}
          <div className="space-y-3 sm:space-y-5 lg:space-y-7 col-span-1">

            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-green-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500" />
              </span>
              <span className="text-[10px] sm:text-sm font-semibold text-slate-700 whitespace-nowrap">Open to opportunities</span>
              <span className="text-[9px] sm:text-xs text-slate-400 font-medium hidden sm:inline">· 2026</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="text-slate-500 font-semibold text-xs sm:text-lg tracking-wide mb-0.5 sm:mb-1">Hi, I&apos;m</p>
              <h1 className="text-3xl sm:text-5xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Daksh<br />
                <span className="relative inline-block" style={{
                  background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 55%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Nehra
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 origin-left"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Role typewriter — hidden on smallest phones, shown sm+ */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden sm:block"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100">
                <FiCode size={14} className="text-blue-500 flex-shrink-0" />
                <TypeAnimation
                  sequence={["Full-Stack Engineer", 2200, "ML Engineer", 2200, "AI Agent Architect", 2200, "DSA Problem Solver", 2200]}
                  wrapper="span" speed={55} repeat={Infinity}
                  className="text-xs sm:text-base font-bold"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                />
              </div>
            </motion.div>

            {/* Description — hidden on mobile, shown sm+ */}
            <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden sm:block text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg"
            >
              Computer Science student at <span className="font-semibold text-slate-700">BML Munjal University</span>{" "}
              building production-grade web apps, autonomous AI agents, and predictive ML systems.
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              <motion.a href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(59,130,246,0.38)" }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-white shadow-lg text-xs sm:text-base"
                style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
              >
                My Work
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                  <FiArrowRight size={14} />
                </motion.span>
              </motion.a>

              {/* Agent button — visible on all screens */}
              <motion.button onClick={handleAgentClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className={"flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold border-2 transition-all duration-200 shadow-sm text-xs sm:text-base " +
                  (agentSpeaking ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-violet-200 text-violet-600 hover:border-violet-400 hover:bg-violet-50")}
              >
                {agentSpeaking
                  ? <><FiMicOff size={13} /><span className="hidden sm:inline">Stop</span></>
                  : <><FiMic size={13} /><span>Intro</span></>
                }
              </motion.button>
            </motion.div>

            {/* Social row — hidden on mobile */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
              className="hidden sm:flex items-center gap-3 pt-1"
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Find me</span>
              <div className="h-px w-10 bg-slate-200" />
              <div className="flex gap-2">
                {socialLinks.map((s, i) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.08 }}
                    whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                  >
                    <s.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats row — 2 cols on mobile, 4 on sm+ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1"
            >
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(59,130,246,0.12)" }}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm p-2 sm:p-3 text-center cursor-default transition-all duration-200"
                >
                  <div className={"text-base sm:text-xl font-black " + s.color}>{s.value}</div>
                  <div className="text-[8px] sm:text-[10px] font-semibold text-slate-400 mt-0.5 leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* AVATAR — always right column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative col-span-1"
          >
            <div className="absolute inset-0 -m-2 bg-gradient-to-br from-blue-400/10 via-violet-400/10 to-cyan-400/10 rounded-3xl blur-2xl" />

            {/* Canvas height: taller on bigger screens */}
            <div className="relative z-10 h-[340px] sm:h-[440px] lg:h-[640px] w-full rounded-2xl overflow-hidden">
              <HeroCanvas />
            </div>

            {/* Floating quote cards — desktop only */}
            <motion.div initial={{ opacity: 0, scale: 0.8, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }} whileHover={{ scale: 1.05 }}
              className="absolute -right-4 top-10 bg-white rounded-2xl shadow-xl border border-blue-100 px-4 py-3 hidden lg:flex items-center gap-3 z-20 max-w-[210px]"
            >
              <span className="text-2xl flex-shrink-0">🚀</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">
                &ldquo;Build systems that think, scale, and inspire.&rdquo;
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8, x: -30 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }} whileHover={{ scale: 1.05 }}
              className="absolute -left-4 bottom-20 bg-white rounded-2xl shadow-xl border border-violet-100 px-4 py-3 hidden lg:flex items-center gap-3 z-20 max-w-[210px]"
            >
              <span className="text-2xl flex-shrink-0">🤖</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">
                &ldquo;Turning data into decisions, code into intelligence.&rdquo;
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }} whileHover={{ scale: 1.05 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white rounded-2xl shadow-xl border border-cyan-100 px-4 py-3 hidden lg:flex items-center gap-3 z-20 max-w-[230px]"
            >
              <span className="text-2xl flex-shrink-0">⚡</span>
              <p className="text-xs font-semibold text-slate-700 leading-snug">
                &ldquo;From idea to production — fast, clean, and scalable.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 z-10"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5">
          <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}