"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/stores/cart-store"
import { useWishlistStore } from "@/lib/stores/wishlist-store"
import { toast } from "sonner"
import { Product } from "../../../types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const itemInCart = isInCart(product.id)
  const itemInWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (itemInWishlist) {
      removeFromWishlist(product.id)
      toast.info("Removed from wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product) // Now this should work with the full Product type
      toast.success("Added to wishlist!", {
        description: `${product.name} has been saved to your wishlist.`,
      })
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toast.info("Quick view", {
      description: `Quick view feature for ${product.name} coming soon!`,
    })
  }

  return (
    <div className="group relative bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Image Container - Make only the image area clickable */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-dark-border">
          <Image
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary-400 hover:bg-primary-500 text-white border-0">
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="secondary" className="bg-accent-500 hover:bg-accent-600 text-white border-0">
                Bestseller
              </Badge>
            )}
          </div>
        </div>
      </Link>
      
      {/* Overlay Actions - Positioned absolutely so they don't interfere with the link */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button 
          variant="secondary" 
          size="icon" 
          className={`h-9 w-9 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm hover:bg-white ${
            itemInWishlist ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${itemInWishlist ? 'fill-current' : ''}`} />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-9 w-9 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm hover:bg-white"
          onClick={handleQuickView}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Add to Cart - Appears on hover */}
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button 
          size="sm" 
          className={`w-full rounded-full shadow-lg ${
            itemInCart 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "bg-primary-400 hover:bg-primary-500 text-white"
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {itemInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-medium text-primary-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        
        {/* Product Name - Make clickable */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary line-clamp-2 mb-2 hover:text-primary-400 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-dark-text-secondary line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-4 w-4 ${
                  star <= product.rating 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300 dark:text-gray-600'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-dark-text-secondary">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
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
          
          {/* Mobile-only CTA */}
          <Button 
            size="sm" 
            className={`rounded-full px-4 md:hidden ${
              itemInCart 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-primary-400 hover:bg-primary-500 text-white"
            }`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}