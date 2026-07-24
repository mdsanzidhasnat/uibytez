"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, formatPrice, whatsappLink } from "@/data/content";
import { useOrder } from "@/lib/order-context";

export default function ConfirmationPage() {
  const { order, resetOrder } = useOrder();

  const plan = pricingPlans.find(
    (p) => p.name.toLowerCase() === (order.package || "").toLowerCase()
  );

  // Clean up order context on unmount
  useEffect(() => {
    return () => {
      resetOrder();
    };
  }, [resetOrder]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Success icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Thank You! Order Received
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We&apos;ve received your order and payment details. Our team will verify
            your payment and get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Step indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center items-center gap-3 mb-10"
        >
          {["Your Details", "Payment", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  "bg-primary text-primary-foreground"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {step}
              </span>
              {i < 2 && <div className="w-8 h-px bg-primary hidden sm:block" />}
            </div>
          ))}
        </motion.div>

        {/* Order summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
        >
          <h2 className="text-lg font-semibold mb-5">Order Summary</h2>

          <div className="space-y-3">
            {order.fullName && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{order.fullName}</span>
              </div>
            )}
            {order.email && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{order.email}</span>
              </div>
            )}
            {order.phone && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{order.phone}</span>
              </div>
            )}
            {plan && (
              <>
                <div className="border-t border-border pt-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium">{plan.name} — {plan.tagline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-lg">{formatPrice(plan, order.currency || "USD")}</span>
                </div>
              </>
            )}
            {order.transactionId && (
              <>
                <div className="border-t border-border pt-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono font-medium">{order.transactionId}</span>
                </div>
                {order.paymentMethod && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium capitalize">{order.paymentMethod}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-lg font-semibold mb-3">What happens next?</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              Our team will verify your payment within 24 hours.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              {order.email || order.phone ? (
                <>
                  We&apos;ll contact you at{" "}
                  <span className="font-medium text-foreground">
                    {order.email || order.phone}
                  </span>{" "}
                  to confirm and begin the project.
                </>
              ) : (
                "We'll reach out to confirm and begin the project."
              )}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              You&apos;ll receive a project timeline and onboarding details.
            </li>
          </ul>
        </motion.div>

        {/* WhatsApp fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Need a faster response? Contact us directly:
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2 rounded-full">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </a>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
