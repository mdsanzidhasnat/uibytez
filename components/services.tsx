"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Crafting Digital Experiences That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From strategy to execution, we deliver end-to-end solutions that help brands grow, engage, and convert in the digital space.
          </p>
        </motion.div>

        {/* Service grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-3xl transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
