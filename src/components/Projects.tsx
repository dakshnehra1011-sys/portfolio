"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiExternalLink, FiCalendar } from "react-icons/fi";
import {
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
} from "react-icons/si";
import { FiCpu, FiZap, FiDatabase } from "react-icons/fi";

const projects = [
  {
    title: "Real-Time Polling App",
    period: "May 2025 – Aug 2025",
    category: "Full-Stack",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-100",
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    description: [
      "Built a real-time polling platform using WebSockets with secure REST APIs and JWT authentication",
      "Implemented Bcrypt password hashing and optimized database queries for smooth performance",
      "Designed scalable backend architecture supporting concurrent users with minimal latency",
    ],
    techStack: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "WebSockets", icon: FiZap, color: "#F59E0B" },
    ],
    tags: ["Full-Stack", "Real-Time", "WebSockets"],
    github: "https://github.com/dakshnehra1011-sys",
    icon: "🗳️",
  },
  {
    title: "AI-Talent-Scheduler-Agent",
    period: "Dec 2025 – Feb 2026",
    category: "AI Agent",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    accentColor: "text-violet-600",
    badgeBg: "bg-violet-50",
    description: [
      "Engineered an AI Resume Parser that extracts skills and experience from PDF/Docx files automatically",
      "Integrated an automated scheduling system to match candidates with interview slots based on metadata",
      "Reduced manual screening time by structuring unstructured talent data into organized JSON formats",
    ],
    techStack: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "NLP", icon: FiCpu, color: "#8B5CF6" },
      { name: "Regex", icon: FiDatabase, color: "#6366F1" },
    ],
    tags: ["AI Agent", "NLP", "Automation"],
    github: "https://github.com/dakshnehra1011-sys",
    icon: "🤖",
  },
  {
    title: "Smart Ghar",
    period: "Aug 2025 – Dec 2025",
    category: "Machine Learning",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-100",
    accentColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    description: [
      "Developed a machine learning-based Gurugram House Price Prediction system using regression algorithms",
      "Performed data preprocessing, feature engineering, and exploratory data analysis on real estate data",
      "Achieved high prediction accuracy through model tuning and cross-validation techniques",
    ],
    techStack: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
    ],
    tags: ["Machine Learning", "Data Science", "Regression"],
    github: "https://github.com/dakshnehra1011-sys",
    icon: "🏠",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid-subtle opacity-50" />

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
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Real-world applications spanning full-stack development, AI agents, and machine learning
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(59,130,246,0.12)" }}
              className={`glass-card rounded-2xl overflow-hidden border ${project.borderColor} transition-all duration-300 flex flex-col`}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${project.bgGradient} p-6 border-b ${project.borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{project.icon}</div>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-lg bg-white/80 border border-white flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
                    >
                      <FiGithub size={16} />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-lg bg-white/80 border border-white flex items-center justify-center text-slate-600 hover:text-blue-600 shadow-sm transition-colors"
                    >
                      <FiExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-1">
                  {project.title}
                </h3>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <FiCalendar size={12} />
                  <span>{project.period}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Description */}
                <ul className="space-y-2 mb-5 flex-1">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-sm"
                      >
                        <tech.icon size={11} style={{ color: tech.color }} />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full ${project.badgeBg} ${project.accentColor} text-xs font-semibold border ${project.borderColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
