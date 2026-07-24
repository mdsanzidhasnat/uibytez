"use client";

import { useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertCircle, Upload, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, formatPrice, type Currency } from "@/data/content";
import { useCurrency } from "@/lib/currency-context";
import { useOrder } from "@/lib/order-context";

/*
  TODO — FUTURE UPGRADE: Once an SSLCommerz merchant account is set up
  (requires business/trade license registration), replace this manual
  payment method selection with a real SSLCommerz hosted checkout redirect,
  which natively supports both BDT (bKash/Nagad/cards) and international
  currencies (USD/EUR/GBP) through one integration. SSLCommerz API
  integration would replace this whole step with an automatic
  redirect-and-verify flow instead of manual transaction ID entry.
*/

const BDT_PAYMENT_METHODS = [
  {
    id: "bkash",
    name: "bKash",
    color: "#E2136E",
    // TODO: Replace BKASH_NUMBER_PLACEHOLDER with your real bKash personal/merchant number.
    account: "BKASH_NUMBER_PLACEHOLDER",
    instructions: "Send Money to this number, then enter the Transaction ID below.",
  },
  {
    id: "nagad",
    name: "Nagad",
    color: "#F6921E",
    // TODO: Replace NAGAD_NUMBER_PLACEHOLDER with your real Nagad personal/merchant number.
    account: "NAGAD_NUMBER_PLACEHOLDER",
    instructions: "Send Money to this number, then enter the Transaction ID below.",
  },
];

const USD_PAYMENT_METHODS = [
  {
    id: "payoneer",
    name: "Payoneer",
    color: "#2B65EC",
    // TODO: Replace PAYONEER_EMAIL_PLACEHOLDER with your real Payoneer payment request email.
    account: "PAYONEER_EMAIL_PLACEHOLDER",
    instructions: "Send payment to the Payoneer email above, then enter the Transaction/Reference ID below.",
  },
  {
    id: "wise",
    name: "Wise",
    color: "#9FE870",
    // TODO: Replace WISE_LINK_PLACEHOLDER with your real Wise payment link or email.
    account: "WISE_LINK_PLACEHOLDER",
    instructions: "Send payment via the Wise link above, then enter the Reference ID below.",
  },
];

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const { order, setOrder } = useOrder();

  const packageName = searchParams.get("package") || order.package || "standard";
  const plan = pricingPlans.find((p) => p.name.toLowerCase() === packageName) || pricingPlans[1];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const paymentMethods = currency === "BDT" ? BDT_PAYMENT_METHODS : USD_PAYMENT_METHODS;

  const selectedPayment = paymentMethods.find((m) => m.id === paymentMethod);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!paymentMethod) newErrors.paymentMethod = "Please select a payment method";
    if (!transactionId.trim()) newErrors.transactionId = "Transaction ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setOrder({
      paymentMethod,
      transactionId,
      screenshotFile,
    });

    try {
      // Send order to API
      const orderPayload = {
        ...order,
        package: plan.name,
        currency,
        paymentMethod,
        transactionId,
      };

      const formData = new FormData();
      formData.append("orderData", JSON.stringify(orderPayload));
      if (screenshotFile) {
        formData.append("screenshot", screenshotFile);
      }

      const res = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit order");
      }

      router.push("/order/confirmation");
    } catch {
      setIsSubmitting(false);
      setErrors({ submit: "Something went wrong. Please try again." });
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
            href={`/order?package=${packageName}&currency=${currency.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Order Details
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
            Payment
          </h1>
          <p className="text-muted-foreground">
            Step 2 of 3 — Choose a payment method and submit your transaction details.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-10">
          {["Your Details", "Payment", "Confirmation"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < 1 ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  i <= 1 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
              {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Payment form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment method selection */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>

                {errors.paymentMethod && (
                  <p className="mb-3 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.paymentMethod}
                  </p>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.id);
                        if (errors.paymentMethod) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.paymentMethod;
                            return next;
                          });
                        }
                      }}
                      className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: method.color }}
                        >
                          {method.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{method.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {method.account}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment instructions */}
              {selectedPayment && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold mb-3">
                    How to pay with {selectedPayment.name}
                  </h3>
                  <div className="rounded-xl bg-muted/50 p-4 mb-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Send payment to:
                    </div>
                    <div className="text-lg font-mono font-semibold break-all">
                      {selectedPayment.account}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment.instructions}
                  </p>
                </motion.div>
              )}

              {/* Transaction ID + Screenshot */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <h3 className="font-semibold">Transaction Details</h3>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Transaction ID / Reference Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => {
                      setTransactionId(e.target.value);
                      if (errors.transactionId) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.transactionId;
                          return next;
                        });
                      }
                    }}
                    placeholder="e.g. 8A3K7M2N9P"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-base font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.transactionId ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.transactionId && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.transactionId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Payment Screenshot <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  {/* TODO: File upload storage (e.g. Cloudinary, Vercel Blob, or S3) needs to be wired up before this goes live. Currently the file is only passed in-memory to the API route. */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {screenshotFile ? screenshotFile.name : "Click to upload a screenshot"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </div>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setScreenshotFile(file);
                    }}
                  />
                </div>
              </div>

              {/* Submit error */}
              {errors.submit && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.submit}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setErrors((prev) => {
                      const next = { ...prev };
                      delete next.submit;
                      return next;
                    })}
                  >
                    Try Again
                  </Button>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Order..." : "Confirm & Submit Order"}
              </Button>
            </form>
          </motion.div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 max-md:static">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{plan.tagline}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold">{formatPrice(plan, currency)}</span>
                </div>
              </div>

              {order.fullName && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="text-xs text-muted-foreground mb-2">Order for</div>
                  <div className="text-sm font-medium">{order.fullName}</div>
                  <div className="text-xs text-muted-foreground">{order.email}</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
