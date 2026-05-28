"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiCpu,
  FiAward,
  FiBookOpen,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

const stats = [
  { icon: FiCode, value: "200+", label: "DSA Problems", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: FiCpu, value: "3", label: "Major Projects", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: FiAward, value: "1", label: "Internship", color: "text-cyan-500", bg: "bg-cyan-50" },
  { icon: FiAward, value: "🏆", label: "Hackathon Winner", color: "text-amber-500", bg: "bg-amber-50" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid-subtle opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Who I{" "}
            <span className="gradient-text-blue-violet">Am</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Text */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <p className="text-slate-600 text-lg leading-relaxed">
                I am a driven Computer Science student and product engineer with a strong foundation
                in full-stack architecture, machine learning, and intelligent system design. My
                technical stack centers around{" "}
                <span className="font-semibold text-blue-600">React.js, Node.js, Python</span>, and
                cloud-ready databases (MongoDB and PostgreSQL), which I leverage to build
                high-performance web applications and real-time data ecosystems.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-slate-600 text-lg leading-relaxed">
                Deepening my expertise in autonomous workflows, I architect practical AI
                solutions—including{" "}
                <span className="font-semibold text-violet-600">
                  Generative AI orchestration, Deep Learning architectures
                </span>
                , and predictive ML models—while engineering automated NLP agents for unstructured
                data extraction.
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-blue-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <FiBookOpen className="text-white" size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">BML Munjal University</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-0.5">
                    B.Tech Computer Science & Engineering
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <FiCalendar size={14} />
                      <span>2023 – 2027</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <FiMapPin size={14} />
                      <span>Gurugram, Haryana</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-semibold text-slate-700">CGPA:</span>
                      <span className="font-bold text-blue-600">6.82</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats grid + visual */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="glass-card rounded-2xl p-5 text-center border border-blue-50 cursor-default"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}
                  >
                    {typeof stat.value === "string" && stat.value.includes("🏆") ? (
                      <span className="text-2xl">{stat.value}</span>
                    ) : (
                      <stat.icon className={stat.color} size={22} />
                    )}
                  </div>
                  {!stat.value.includes("🏆") && (
                    <div className={`text-3xl font-extrabold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                  )}
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative neural visual */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 p-8 h-48 flex items-center justify-center"
            >
              {/* Animated circles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-blue-200/60"
                  style={{
                    width: `${(i + 1) * 70}px`,
                    height: `${(i + 1) * 70}px`,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 10 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FiCpu className="text-white" size={26} />
                </div>
                <p className="text-sm font-semibold text-slate-600">AI-First Engineer</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
