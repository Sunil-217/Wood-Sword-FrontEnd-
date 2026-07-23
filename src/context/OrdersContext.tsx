"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "mmsports-orders-v1";

export type OrderStatus = "Pending" | "Packed" | "Shipped" | "Delivered";
export const ORDER_STATUSES: OrderStatus[] = ["Pending", "Packed", "Shipped", "Delivered"];

export interface Order {
  id: string;
  createdAt: string; // ISO
  email: string;
  name: string;
  address: string;
  items: CartLine[];
  subtotal: number;
  discount: number;
  coupon: string | null;
  shipping: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
  status: OrderStatus;
}

export interface NewOrderInput {
  email: string;
  name: string;
  address: string;
  items: CartLine[];
  subtotal: number;
  discount: number;
  coupon: string | null;
  shipping: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
}

interface OrdersApi {
  orders: Order[];
  ready: boolean;
  addOrder: (input: NewOrderInput) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
  ordersFor: (email: string) => Order[];
}

const OrdersContext = createContext<OrdersApi | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders, ready]);

  const addOrder = useCallback((input: NewOrderInput): Order => {
    const order: Order = {
      ...input,
      id: `MM-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const ordersFor = useCallback(
    (email: string) => orders.filter((o) => o.email.toLowerCase() === email.toLowerCase()),
    [orders],
  );

  const value = useMemo<OrdersApi>(
    () => ({ orders, ready, addOrder, updateStatus, ordersFor }),
    [orders, ready, addOrder, updateStatus, ordersFor],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersApi {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within <OrdersProvider>");
  return ctx;
}
