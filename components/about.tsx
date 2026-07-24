"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/data/content";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            {aboutContent.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {aboutContent.headline}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutContent.description}
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid gap-6 md:grid-cols-3 mb-20">
          {aboutContent.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-green-accent group-hover:w-full transition-all duration-500 rounded-t-2xl" />
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-2xl border border-border bg-card p-8 md:p-12"
        >
          {aboutContent.highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-base md:text-lg font-semibold text-foreground mb-1">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
