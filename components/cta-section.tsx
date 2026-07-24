"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaContent, heroContent } from "@/data/content";

export function CtaSection() {
  const searchParams = useSearchParams();
  const subjectDefault = searchParams.get("type") === "consultation" ? "Consultation Request" : "";
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-teal-700 p-8 md:p-16 text-primary-foreground"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left — Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                {ctaContent.headline}
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
                {ctaContent.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-7 gap-2 bg-white text-primary hover:bg-white/90 group"
                  onClick={() => {
                    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                {/* TODO: Replace Link href with real Calendly (or similar) booking link once set up. */}
                <Link href={heroContent.consultationCta.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 gap-2 border-white/30 text-white hover:bg-white/10"
                  >
                    <Calendar className="h-4 w-4" />
                    {heroContent.consultationCta.label}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — Contact info */}
            <div className="space-y-6">
              {/* Contact form card */}
              <div
                id="contact-form"
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-base placeholder:text-primary-foreground/50 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-base placeholder:text-primary-foreground/50 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  defaultValue={subjectDefault}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-base placeholder:text-primary-foreground/50 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-base placeholder:text-primary-foreground/50 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full rounded-xl bg-white text-primary hover:bg-white/90"
                >
                  Send Message
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-primary-foreground/70">
                <a
                  href={ctaContent.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${ctaContent.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {ctaContent.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
