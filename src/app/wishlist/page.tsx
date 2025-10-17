"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { useWishlistStore } from "@/lib/stores/wishlist-store"
import { useCartStore } from "@/lib/stores/cart-store"
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function WishlistPage() {
  const { data: session } = useSession()
  const { items, removeItem, clearWishlist, getTotalItems, syncWithDatabase } = useWishlistStore()
  const { addItem } = useCartStore()

  // Sync wishlist with database when component mounts
  useEffect(() => {
    if (session?.user) {
      syncWithDatabase()
    }
  }, [session?.user, syncWithDatabase])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    })
    
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleMoveAllToCart = () => {
    items.forEach((product: any) => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    })
    
    toast.success("All items moved to cart!", {
      description: `${items.length} items have been added to your cart.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              Save your favorite products here to keep track of items you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
                  Explore Products
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="rounded-full">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary-400">Wishlist</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
            Your saved products ({getTotalItems()} items)
          </p>
        </div>

        {/* Wishlist Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
          <div>
            <h2 className="text-lg font-semibold">Saved Items</h2>
            <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
              {getTotalItems()} product{getTotalItems() !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleMoveAllToCart}
              className="bg-primary-400 hover:bg-primary-500 text-white rounded-full flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Move All to Cart
            </Button>
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {items.map((product: any) => (
            <div key={product.id} className="group relative bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden transition-all duration-300 hover:shadow-lg">
              {/* Remove from Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeItem(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {/* Product Image */}
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-dark-border">
                  <Image
                    src={product.images[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs font-medium text-primary-400 uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary line-clamp-2 mb-2 hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-dark-text-secondary line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary-400 hover:bg-primary-500 text-white rounded-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" className="rounded-full flex items-center gap-2 mx-auto">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}