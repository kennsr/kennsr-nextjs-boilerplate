'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { usePOSStore, type Product } from './store'
import { cn } from '@/lib/utils'

const DEMO_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Coffee Bean', price: 120000, category: 'Coffee' },
  { id: '2', name: 'Aeropress Go', price: 850000, category: 'Equipment' },
  { id: '3', name: 'V60 Paper Filter', price: 65000, category: 'Accessories' },
  { id: '4', name: 'Digital Scale Pro', price: 1200000, category: 'Equipment' },
  { id: '5', name: 'Single Origin Ethiopia', price: 180000, category: 'Coffee' },
  { id: '6', name: 'Hand Grinder Z2', price: 2100000, category: 'Equipment' },
]

export default function POSFeature() {
  const { cart, addItem, removeItem, updateQuantity, total, toggleCart, isCartOpen } = usePOSStore()

  return (
    <div className="flex flex-col h-screen max-w-7xl mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Apex POS Demo</h1>
          <p className="text-muted-foreground text-sm">Zustand + Framer Motion high-speed interface.</p>
        </div>
        <button 
          onClick={toggleCart}
          className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pb-20">
        {DEMO_PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -4 }}
            className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {product.category}
              </span>
              <h3 className="font-medium mt-1">{product.name}</h3>
              <p className="text-lg font-bold mt-2 text-white">
                IDR {product.price.toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={() => addItem(product)}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cart Sidebar/Overlay */}
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end"
          onClick={toggleCart}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="w-full max-w-md bg-card h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Current Order
              </h2>
              <button onClick={toggleCart} className="text-muted-foreground hover:text-white">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">Your cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">IDR {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-secondary rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-mono w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-destructive hover:opacity-80"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t bg-secondary/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-white">IDR {total.toLocaleString('id-ID')}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
              >
                Complete Payment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
