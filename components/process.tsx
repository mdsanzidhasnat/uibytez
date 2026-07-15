"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 relative">
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
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            From Idea to Impact
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A proven process refined over years of shipping successful products — transparent, agile, and focused on outcomes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Step number */}
                <div className="relative mx-auto mb-6">
                  <div className="relative z-10 mx-auto h-16 w-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-lg group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    {step.step}
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
