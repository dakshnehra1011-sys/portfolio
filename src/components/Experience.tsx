"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from "react-icons/fi";

const experiences = [
  {
    role: "AI Application Trainee",
    department: "Portfolio Management",
    company: "New Delhi Data Point Pvt. Ltd. (DATA DIGEST)",
    location: "New Delhi, India",
    period: "June 2025 – July 2025",
    type: "Internship",
    color: "from-blue-500 to-violet-600",
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    responsibilities: [
      "Built ML-based risk assessment and predictive financial modeling systems for portfolio analysis",
      "Worked with large-scale financial datasets to perform trend analysis and asset optimization",
      "Developed data pipelines for automated financial report generation and insights extraction",
      "Collaborated with senior analysts to validate model outputs against real market benchmarks",
    ],
    skills: ["Machine Learning", "Python", "Financial Modeling", "Data Analysis", "Risk Assessment"],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4 border border-violet-100">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Work{" "}
            <span className="gradient-text-blue-violet">Experience</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Professional experience building real-world AI and data solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-violet-200 to-transparent hidden sm:block" />

          {/* Animated line overlay */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-violet-500 hidden sm:block"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              className="relative sm:pl-20 mb-8"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                className="absolute left-4 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg hidden sm:flex"
              >
                <FiBriefcase className="text-white" size={14} />
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(59,130,246,0.12)" }}
                className={`glass-card rounded-2xl p-6 border ${exp.borderColor} transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full ${exp.bgColor} ${exp.accentColor} text-xs font-bold border ${exp.borderColor}`}>
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">{exp.role}</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-0.5">{exp.department}</p>
                  </div>

                  <div className="text-right">
                    <div className={`text-base font-bold ${exp.accentColor}`}>{exp.company}</div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1 justify-end">
                      <FiCalendar size={13} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-0.5 justify-end">
                      <FiMapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-blue-100 via-violet-100 to-transparent mb-4" />

                {/* Responsibilities */}
                <ul className="space-y-2.5 mb-5">
                  {exp.responsibilities.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed"
                    >
                      <FiCheckCircle className={`${exp.accentColor} flex-shrink-0 mt-0.5`} size={15} />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
