"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Currency } from "@/data/content";

export interface OrderData {
  package: string;
  currency: Currency;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  projectDetails: string;
  transactionId: string;
  paymentMethod: string;
  screenshotFile: File | null;
}

interface OrderContextType {
  order: Partial<OrderData>;
  setOrder: (data: Partial<OrderData>) => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType>({
  order: {},
  setOrder: () => {},
  resetOrder: () => {},
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrderState] = useState<Partial<OrderData>>({});

  const setOrder = (data: Partial<OrderData>) => {
    setOrderState((prev) => ({ ...prev, ...data }));
  };

  const resetOrder = () => {
    setOrderState({});
  };

  return (
    <OrderContext.Provider value={{ order, setOrder, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
