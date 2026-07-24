"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Currency } from "@/data/content";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem("uibytez-currency") as Currency | null;
      if (stored === "USD" || stored === "BDT") {
        setCurrencyState(stored);
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      sessionStorage.setItem("uibytez-currency", c);
    } catch {
      // sessionStorage not available
    }
  };

  // Prevent hydration mismatch by rendering children only after mount
  if (!mounted) {
    return (
      <CurrencyContext.Provider value={{ currency: "USD", setCurrency }}>
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
