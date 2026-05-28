"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: FiGithub,
    href: "https://github.com/dakshnehra1011-sys",
    label: "GitHub",
  },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/daksh-nehra",
    label: "LinkedIn",
  },
  {
    icon: SiLeetcode,
    href: "https://leetcode.com/u/Zw5DEF57UI/",
    label: "LeetCode",
  },
  {
    icon: SiGeeksforgeeks,
    href: "https://www.geeksforgeeks.org/profile/dakshnehdcbn",
    label: "GeeksForGeeks",
  },
  {
    icon: FiMail,
    href: "mailto:daksh.nehra.23cse@bmu.edu.in",
    label: "Email",
  },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">DN</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Daksh Nehra</h3>
                <p className="text-slate-400 text-xs">Full-Stack & ML Engineer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building intelligent systems and scalable web applications with modern technologies.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-200"
                >
                  <social.icon size={17} />
                </motion.a>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-slate-500 text-xs">Available for freelance & full-time roles</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Open to work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © 2025 Daksh Nehra. Built with Next.js &{" "}
            <FiHeart className="inline text-red-400" size={13} />
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs">Powered by</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono">
              Next.js 14
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono">
              Framer Motion
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
