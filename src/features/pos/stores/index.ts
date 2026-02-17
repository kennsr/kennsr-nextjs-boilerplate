import { create } from "zustand";
import { type Category, type Product, type CartItem } from "./types";
import { PRODUCTS } from "../constants";

interface POSState {
  cart: CartItem[];
  isCartOpen: boolean;
  activeCategory: Category;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCategory: (category: Category) => void;
  total: number;
}

function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const usePOSStore = create<POSState>((set, get) => ({
  cart: [],
  isCartOpen: true,
  activeCategory: "all",
  total: 0,

  setCategory: (category) => set({ activeCategory: category }),

  addItem: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      set({ cart: newCart, total: calculateTotal(newCart), isCartOpen: true });
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      set({ cart: newCart, total: calculateTotal(newCart), isCartOpen: true });
    }
  },

  removeItem: (productId) => {
    const { cart } = get();
    const newCart = cart.filter((item) => item.id !== productId);
    set({ cart: newCart, total: calculateTotal(newCart) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const { cart } = get();
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );
    set({ cart: newCart, total: calculateTotal(newCart) });
  },

  clearCart: () => set({ cart: [], total: 0 }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

// Re-export everything for convenience
export * from "./types";
export * from "../constants";
