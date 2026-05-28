"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiExternalLink,
} from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "daksh.nehra.23cse@bmu.edu.in",
    href: "mailto:daksh.nehra.23cse@bmu.edu.in",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 8266814074",
    href: "tel:+918266814074",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/daksh-nehra",
    href: "https://www.linkedin.com/in/daksh-nehra",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
];

const socialLinks = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/dakshnehra1011-sys",
    color: "hover:text-slate-900 hover:border-slate-300",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daksh-nehra",
    color: "hover:text-blue-600 hover:border-blue-300",
  },
  {
    icon: SiLeetcode,
    label: "LeetCode",
    href: "https://leetcode.com/u/Zw5DEF57UI/",
    color: "hover:text-orange-500 hover:border-orange-300",
  },
  {
    icon: SiGeeksforgeeks,
    label: "GeeksForGeeks",
    href: "https://www.geeksforgeeks.org/profile/dakshnehdcbn",
    color: "hover:text-green-600 hover:border-green-300",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Background orbs */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-100/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Open to opportunities, collaborations, and interesting conversations
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get in Touch</h3>
              <p className="text-slate-500 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hi —
                my inbox is always open. I&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={itemVariants}
                  whileHover={{ x: 6, boxShadow: "0 8px 24px rgba(59,130,246,0.1)" }}
                  className={`flex items-center gap-4 p-4 glass-card rounded-xl border ${info.border} transition-all duration-200 group`}
                >
                  <div className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0`}>
                    <info.icon className={info.color} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className={`font-semibold ${info.color} text-sm truncate`}>{info.value}</p>
                  </div>
                  <FiExternalLink className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" size={16} />
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <p className="text-sm font-semibold text-slate-500 mb-3">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.label}
                    className={`w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 ${social.color} transition-all duration-200 shadow-sm`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-card rounded-2xl p-8 border border-blue-100">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Message
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or just say hi..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
