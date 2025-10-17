import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../../../types/product'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getTotalItems: () => number
  syncWithDatabase: () => Promise<void>
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: async (product) => {
        const { items, isInWishlist } = get()
        
        if (!isInWishlist(product.id)) {
          try {
            const response = await fetch('/api/wishlist', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ productId: product.id }),
            })

            if (!response.ok) {
              throw new Error('Failed to add to wishlist')
            }

            set({ items: [...items, product] })
          } catch (error) {
            console.error('Error adding to wishlist:', error)
            throw error
          }
        }
      },
      
      removeItem: async (productId) => {
        try {
          const response = await fetch(`/api/wishlist?productId=${productId}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            throw new Error('Failed to remove from wishlist')
          }

          set({ items: get().items.filter((item) => item.id !== productId) })
        } catch (error) {
          console.error('Error removing from wishlist:', error)
          throw error
        }
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

      syncWithDatabase: async () => {
        try {
          const response = await fetch('/api/wishlist')
          if (response.ok) {
            const wishlistItems = await response.json()
            const products = wishlistItems.map((item: any) => item.product)
            set({ items: products })
          }
        } catch (error) {
          console.error('Error syncing wishlist:', error)
        }
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)