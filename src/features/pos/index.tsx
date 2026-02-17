"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePOSStore, PRODUCTS } from "./stores";

// Components
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { ProductCard } from "./components/ProductCard";
import { CartPanel } from "./components/CartPanel";

// ─── Main POS Feature ────────────────────────────────────────────────

export default function POSFeature() {
  const [activeCategory, setCategory] = useState(
    usePOSStore.getState().activeCategory,
  );
  const addItem = usePOSStore((state) => state.addItem);
  const activeCatFromStore = usePOSStore((state) => state.activeCategory);
  const setCategoryStore = usePOSStore((state) => state.setCategory);
  const isCartOpen = usePOSStore((state) => state.isCartOpen);
  const toggleCart = usePOSStore((state) => state.toggleCart);
  const cart = usePOSStore((state) => state.cart);

  // Sync internal state with store if needed, or just use store directly
  // Using store directly is better for consistency
  const currentCategory = activeCatFromStore;

  const filteredProducts =
    currentCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === currentCategory);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeCategory={currentCategory}
        onCategoryChange={setCategoryStore}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <TopBar />

        <div className="flex flex-1 gap-4 px-6 pb-6 min-h-0">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white capitalize">
                {currentCategory === "all" ? "All" : currentCategory}
              </h2>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                2026 <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 overflow-y-auto pb-4 flex-1 content-start">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard
                      product={product}
                      onAdd={() => addItem(product)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>{isCartOpen && <CartPanel />}</AnimatePresence>

          {!isCartOpen && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={toggleCart}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full glass-strong flex items-center justify-center shadow-2xl z-50"
            >
              <span className="text-xl">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.reduce((a, i) => a + i.quantity, 0)}
                </span>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
