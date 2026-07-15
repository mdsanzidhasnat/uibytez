"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/content";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl border border-border bg-card p-8 md:p-12 shadow-lg"
          >
            <Quote className="absolute top-6 left-6 h-10 w-10 text-primary/10" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-green-accent/20 flex items-center justify-center text-primary font-bold text-sm">
                {testimonials[current].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-semibold">{testimonials[current].name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[current].role}, {testimonials[current].company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
