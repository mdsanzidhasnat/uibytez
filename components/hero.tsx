"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/data/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-teal-400/20 via-green-accent/10 to-transparent blur-3xl dark:from-teal-500/15 dark:via-green-500/8" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-teal-500/10 to-transparent blur-3xl dark:from-teal-600/8" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(oklch(0.18 0.04 240 / 0.03)_1px,transparent_1px),linear-gradient(90deg,oklch(0.18 0.04 240 / 0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(oklch(0.95 0.005 240 / 0.04)_1px,transparent_1px),linear-gradient(90deg,oklch(0.95 0.005 240 / 0.04)_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-accent animate-pulse" />
              Available for new projects
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              {heroContent.headline.split(" ").map((word, i) => {
                if (word === "Digital" || word === "Experiences") {
                  return (
                    <span key={i} className="gradient-text">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {heroContent.subheadline}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full px-7 gap-2 group"
                onClick={() => {
                  document.querySelector(heroContent.primaryCta.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {heroContent.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 gap-2 group"
                onClick={() => {
                  document.querySelector(heroContent.secondaryCta.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="h-4 w-4" />
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Orbital rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-primary/15 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-primary/10 animate-[spin_40s_linear_infinite]" />

              {/* Center blob */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-green-accent/20 blur-2xl animate-pulse" />
              </div>

              {/* Floating cards */}
              {[
                { icon: "🎨", label: "Design", top: "10%", left: "5%", delay: 0 },
                { icon: "💻", label: "Develop", top: "60%", left: "0%", delay: 0.5 },
                { icon: "🚀", label: "Launch", top: "5%", right: "10%", delay: 1 },
                { icon: "📈", label: "Grow", bottom: "10%", right: "5%", delay: 1.5 },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + card.delay, duration: 0.5 }}
                  className="absolute glass rounded-xl px-4 py-3 border border-border/50 shadow-lg flex items-center gap-2 text-sm font-medium"
                  style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
                >
                  <span className="text-lg">{card.icon}</span>
                  {card.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 overflow-hidden border-t border-border pt-6"
        >
          <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...heroContent.marqueeItems, ...heroContent.marqueeItems].map((item, i) => (
              <span key={i} className="text-sm font-medium text-muted-foreground/60 uppercase tracking-widest flex items-center gap-3">
                {item}
                <span className="h-1 w-1 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
