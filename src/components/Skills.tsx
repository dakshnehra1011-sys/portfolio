"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiLinux,
} from "react-icons/si";
import { FiCloud, FiDatabase, FiCpu, FiCode } from "react-icons/fi";

const skillCategories = [
  {
    title: "Frontend & UI",
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#FF0055" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Backend & Core",
    icon: "⚙️",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Java", icon: FiCode, color: "#ED8B00" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "AI / ML",
    icon: "🤖",
    color: "from-orange-500 to-rose-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "XGBoost", icon: FiCpu, color: "#189AB4" },
      { name: "NLP", icon: FiCpu, color: "#8B5CF6" },
      { name: "LLM Agents", icon: FiCpu, color: "#6366F1" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-100",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Cloud Computing", icon: FiCloud, color: "#4285F4" },
      { name: "Render/PaaS", icon: FiDatabase, color: "#46E3B7" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4 border border-violet-100">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Tech{" "}
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Tools and technologies I use to build intelligent, scalable systems
          </p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(59,130,246,0.12)" }}
              className={`glass-card rounded-2xl p-6 border ${category.borderColor} transition-all duration-300`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-lg shadow-sm`}
                >
                  {category.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-base">{category.title}</h3>
              </div>

              {/* Skill badges */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={badgeVariants}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: `0 0 12px ${skill.color}40`,
                      borderColor: `${skill.color}60`,
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium cursor-default transition-all duration-200 shadow-sm"
                  >
                    <skill.icon
                      size={14}
                      style={{ color: skill.color }}
                      className="flex-shrink-0"
                    />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
