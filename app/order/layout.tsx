import { OrderProvider } from "@/lib/order-context";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrderProvider>{children}</OrderProvider>;
}
