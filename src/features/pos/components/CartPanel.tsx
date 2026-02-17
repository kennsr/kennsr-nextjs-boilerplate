"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePOSStore } from "../store";
import { CartItemRow } from "./CartItemRow";

export function CartPanel() {
  const cart = usePOSStore((state) => state.cart);
  const updateQuantity = usePOSStore((state) => state.updateQuantity);
  const total = usePOSStore((state) => state.total);
  const toggleCart = usePOSStore((state) => state.toggleCart);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="glass-cart w-72 flex flex-col shrink-0 max-h-full"
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-base font-semibold text-white">Cart</h2>
        <button
          type="button"
          onClick={toggleCart}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/50" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 space-y-3 min-h-0">
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.p
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white/30 text-center py-8"
            >
              Cart is empty
            </motion.p>
          ) : (
            cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdate={updateQuantity}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-5 pt-3 mt-auto space-y-3">
        <div className="flex justify-between text-xs text-white/40">
          <span>Quantity</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white/60">Total</span>
          <span className="text-lg font-bold text-white">
            ${total.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          disabled={cart.length === 0}
          className="neural-pay-btn w-full py-3 text-sm"
        >
          Neural Pay
        </button>
      </div>
    </motion.div>
  );
}
