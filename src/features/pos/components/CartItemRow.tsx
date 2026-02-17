"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { type CartItem } from "../store";

export interface CartItemRowProps {
  item: CartItem;
  onUpdate: (id: string, quantity: number) => void;
}

export function CartItemRow({ item, onUpdate }: CartItemRowProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-lg relative overflow-hidden">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="40px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-lg">{item.icon}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-white/80 truncate">
          {item.name}
        </p>
        <p className="text-[11px] text-white/40">
          ${item.price ? item.price.toLocaleString() : "0"}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          className="w-5 h-5 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-xs font-mono w-4 text-center text-white/70">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="w-5 h-5 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
