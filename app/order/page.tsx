"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, formatPrice, type Currency } from "@/data/content";
import { useCurrency } from "@/lib/currency-context";
import { useOrder } from "@/lib/order-context";

function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency, setCurrency } = useCurrency();
  const { order, setOrder } = useOrder();

  const packageName = searchParams.get("package") || "standard";
  const rawCurrency = searchParams.get("currency");
  const currencyParam = (rawCurrency?.toUpperCase() as Currency) || "USD";

  const plan = pricingPlans.find((p) => p.name.toLowerCase() === packageName) || pricingPlans[1];

  // Sync currency from URL
  useEffect(() => {
    if (currencyParam === "USD" || currencyParam === "BDT") {
      setCurrency(currencyParam);
    }
  }, [currencyParam, setCurrency]);

  const [formData, setFormData] = useState({
    fullName: order.fullName || "",
    email: order.email || "",
    phone: order.phone || "",
    businessName: order.businessName || "",
    projectDetails: order.projectDetails || "",
    selectedPackage: plan.name,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlan = pricingPlans.find((p) => p.name === formData.selectedPackage) || plan;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone/WhatsApp number is required";
    if (!formData.projectDetails.trim()) newErrors.projectDetails = "Please describe your project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setOrder({
      package: formData.selectedPackage,
      currency: currency,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName,
      projectDetails: formData.projectDetails,
    });

    // Navigate to checkout
    router.push(
      `/order/checkout?package=${formData.selectedPackage.toLowerCase()}&currency=${currency.toLowerCase()}`
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Complete Your Order
          </h1>
          <p className="text-muted-foreground">
            Step 1 of 3 — Fill in your details and confirm your package selection.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-10">
          {["Your Details", "Payment", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  i === 0 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
              {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Order form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <h2 className="text-lg font-semibold">Your Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        errors.fullName ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Phone / WhatsApp <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXXXXXXX"
                      className={`w-full rounded-xl border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        errors.phone ? "border-destructive" : "border-border"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Business Name <span className="text-muted-foreground text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Project Details / Requirements <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    rows={5}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${
                      errors.projectDetails ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.projectDetails}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Change Package
                  </label>
                  <select
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {pricingPlans.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {p.tagline} ({formatPrice(p, currency)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Continue to Payment"}
              </Button>
            </form>
          </motion.div>

          {/* Package summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 max-md:static">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="rounded-xl bg-muted/50 p-4 mb-4">
                <div className="text-sm text-muted-foreground mb-1">{selectedPlan.tagline}</div>
                <div className="text-2xl font-bold">{formatPrice(selectedPlan, currency)}</div>
                <div className="text-xs text-muted-foreground mt-1">{selectedPlan.period}</div>
              </div>

              <h4 className="text-sm font-medium mb-3">Included:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <OrderForm />
    </Suspense>
  );
}
