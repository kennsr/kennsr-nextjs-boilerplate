"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { type Product } from "../stores/types";

export interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onAdd}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-1 text-left group cursor-pointer w-full h-full flex flex-col"
    >
      <div className="aspect-square rounded-lg bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center mb-3 overflow-hidden relative">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">
            {product.icon}
          </span>
        )}
      </div>

      <div className="px-2 pb-2">
        <h3 className="text-sm font-medium text-white/80 truncate">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-white/50 mt-0.5">
          ${product.price ? product.price.toLocaleString() : "0"}
        </p>
      </div>
    </motion.button>
  );
}
