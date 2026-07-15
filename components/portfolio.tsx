"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems } from "@/data/content";

const categories = ["All", ...new Set(portfolioItems.map((p) => p.category))];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Projects We&apos;re Proud Of
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A curated selection of our recent work across branding, design, development, and digital marketing.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Color preview */}
              <div
                className="relative h-52 overflow-hidden"
                style={{ backgroundColor: item.color + "15" }}
              >
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${item.color}40, transparent 60%), radial-gradient(circle at 70% 60%, ${item.color}20, transparent 50%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.title.charAt(0)}
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center">
                  <ArrowUpRight className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0" />
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
