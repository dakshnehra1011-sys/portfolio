"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const githubUsername = "dakshnehra1011-sys";

const statsCards = [
  {
    title: "GitHub Stats",
    src: `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=3B82F6&icon_color=8B5CF6&text_color=334155&ring_color=3B82F6`,
    alt: "GitHub Stats",
    colSpan: "md:col-span-2",
  },
  {
    title: "Top Languages",
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=default&hide_border=true&bg_color=ffffff&title_color=3B82F6&text_color=334155`,
    alt: "Top Languages",
    colSpan: "md:col-span-1",
  },
  {
    title: "GitHub Streak",
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=default&hide_border=true&background=ffffff&ring=3B82F6&fire=8B5CF6&currStreakLabel=3B82F6&sideLabels=334155&dates=64748B`,
    alt: "GitHub Streak",
    colSpan: "md:col-span-3",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GitHubStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="github" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-4 border border-slate-200">
            Open Source
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            GitHub{" "}
            <span className="gradient-text">Activity</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Consistent contributions and open-source development
          </p>

          <motion.a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md"
          >
            <FiGithub size={16} />
            View GitHub Profile
            <FiExternalLink size={14} />
          </motion.a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {statsCards.map((card) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(59,130,246,0.1)" }}
              className={`glass-card rounded-2xl p-5 border border-blue-100 transition-all duration-300 ${card.colSpan}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <FiGithub className="text-slate-500" size={16} />
                <h3 className="text-sm font-semibold text-slate-600">{card.title}</h3>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl bg-white border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex items-center justify-center h-32 text-slate-400 text-sm">Stats unavailable</div>`;
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
