"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiAward, FiCode, FiStar, FiUsers } from "react-icons/fi";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const platforms = [
  {
    name: "LeetCode",
    icon: SiLeetcode,
    iconColor: "#FFA116",
    href: "https://leetcode.com/u/Zw5DEF57UI/",
    stats: [
      { label: "Problems Solved", value: "200+", icon: FiCode },
      { label: "Consistency", value: "Active", icon: FiStar },
    ],
    description: "Regularly solving algorithmic challenges across arrays, trees, graphs, DP, and more.",
    gradient: "from-orange-400 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50",
    borderColor: "border-orange-100",
    accentColor: "text-orange-600",
    badgeBg: "bg-orange-50",
  },
  {
    name: "GeeksForGeeks",
    icon: SiGeeksforgeeks,
    iconColor: "#2F8D46",
    href: "https://www.geeksforgeeks.org/profile/dakshnehdcbn",
    stats: [
      { label: "Contributor", value: "Active", icon: FiUsers },
      { label: "Articles Read", value: "500+", icon: FiCode },
    ],
    description: "Active contributor exploring data structures, algorithms, and system design concepts.",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-100",
    accentColor: "text-green-600",
    badgeBg: "bg-green-50",
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "Hackathon Winner",
    subtitle: "DTU CryptoForge",
    detail: "3rd Position — Team V-Sentinels",
    description: "Developed a blockchain security solution that secured 3rd place at DTU's CryptoForge hackathon.",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-100",
    accentColor: "text-amber-600",
  },
  {
    icon: "⚽",
    title: "Sports Captain",
    subtitle: "BML Munjal University",
    detail: "University Football Team",
    description: "Led the university football team as captain, demonstrating leadership and teamwork skills.",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-100",
    accentColor: "text-blue-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function DSAStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="dsa" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 dot-grid-subtle opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-4 border border-orange-100">
            Competitive Programming
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Coding{" "}
            <span className="gradient-text">Stats & Achievements</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Consistent problem-solving across competitive programming platforms
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Platform Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
                className={`glass-card rounded-2xl p-6 border ${platform.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-md`}
                    >
                      <platform.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{platform.name}</h3>
                      <p className="text-slate-500 text-sm">{platform.description.slice(0, 40)}...</p>
                    </div>
                  </div>
                  <motion.a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${platform.badgeBg} ${platform.accentColor} text-sm font-semibold border ${platform.borderColor} transition-colors hover:opacity-80`}
                  >
                    <FiExternalLink size={14} />
                    View
                  </motion.a>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {platform.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {platform.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-xl p-3 bg-gradient-to-br ${platform.bgGradient} border ${platform.borderColor} text-center`}
                    >
                      <div className={`text-2xl font-extrabold ${platform.accentColor}`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
                className={`glass-card rounded-2xl p-6 border ${achievement.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">{achievement.title}</h3>
                      <FiAward className={achievement.accentColor} size={16} />
                    </div>
                    <p className={`font-semibold text-sm ${achievement.accentColor}`}>
                      {achievement.subtitle}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{achievement.detail}</p>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
