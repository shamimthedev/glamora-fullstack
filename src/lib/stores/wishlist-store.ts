import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/lib/products-data'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getTotalItems: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items, isInWishlist } = get()
        
        if (!isInWishlist(product.id)) {
          set({ items: [...items, product] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) })
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      
      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)