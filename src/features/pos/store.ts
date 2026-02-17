import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface POSState {
  cart: CartItem[]
  isCartOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  total: number
}

export const usePOSStore = create<POSState>((set, get) => ({
  cart: [],
  isCartOpen: false,
  total: 0,
  
  addItem: (product) => {
    const { cart } = get()
    const existingItem = cart.find((item) => item.id === product.id)
    
    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      set({ cart: newCart, total: calculateTotal(newCart) })
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }]
      set({ cart: newCart, total: calculateTotal(newCart) })
    }
  },
  
  removeItem: (productId) => {
    const { cart } = get()
    const newCart = cart.filter((item) => item.id !== productId)
    set({ cart: newCart, total: calculateTotal(newCart) })
  },
  
  updateQuantity: (productId, quantity) => {
    const { cart } = get()
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
    set({ cart: newCart, total: calculateTotal(newCart) })
  },
  
  clearCart: () => set({ cart: [], total: 0 }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}))

const calculateTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}
