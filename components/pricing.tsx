"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pricingPlans, formatPrice, type Currency } from "@/data/content";
import { useCurrency } from "@/lib/currency-context";

function CurrencyToggle({ currency, onChange }: { currency: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted/50 p-1 mb-10">
      <button
        onClick={() => onChange("USD")}
        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
          currency === "USD"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        USD ($)
      </button>
      <button
        onClick={() => onChange("BDT")}
        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
          currency === "BDT"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        BDT (৳)
      </button>
    </div>
  );
}

export function Pricing() {
  const { currency, setCurrency } = useCurrency();

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />

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
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Simple, Transparent Packages
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Choose a package that fits your needs. Every project is unique — these are starting points to help you budget.
          </p>

          <div className="flex justify-center">
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{plan.period}</span>
                <div className="text-3xl font-bold mt-1">{formatPrice(plan, currency)}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/order?package=${plan.name.toLowerCase()}&currency=${currency.toLowerCase()}`}
                className="block"
              >
                <Button
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full rounded-xl"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto"
        >
          Final pricing depends on project scope — book a free consultation for an accurate quote.
        </motion.p>
      </div>
    </section>
  );
}
