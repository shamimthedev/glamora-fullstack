"use client"

import { useState } from "react"
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/stores/cart-store"
import { toast } from "sonner"
import { Product } from "../../../types/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id)
    const [quantity, setQuantity] = useState(1)
    const { addItem, isInCart } = useCartStore()

    const selectedVariantData = product.variants.find(v => v.id === selectedVariant)
    const displayPrice = selectedVariantData?.price || product.price
    const itemInCart = isInCart(product.id)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: displayPrice,
            image: "/placeholder-product.jpg", // In real app, use variant image
            category: product.category,
        })

        toast.success("Added to cart!", {
            description: `${product.name} has been added to your cart.`,
        })
    }

    const handleBuyNow = () => {
        handleAddToCart()
        // In a real app, we'd redirect to checkout
        toast.info("Proceed to checkout", {
            description: "Checkout functionality coming soon!",
        })
    }

    return (
        <div className="space-y-6">
            {/* Category & Badges */}
            <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary-400 border-primary-400">
                    {product.category}
                </Badge>
                {product.isNew && (
                    <Badge className="bg-primary-400 hover:bg-primary-500 text-white border-0">
                        New
                    </Badge>
                )}
                {product.isBestSeller && (
                    <Badge className="bg-accent-500 hover:bg-accent-600 text-white border-0">
                        Bestseller
                    </Badge>
                )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text-primary">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-5 w-5 ${star <= product.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
                    {product.rating} ({product.reviewCount} reviews)
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
                    SKU: {product.sku}
                </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                    ${displayPrice.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > displayPrice && (
                    <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                    </span>
                )}
                {product.originalPrice && (
                    <Badge className="bg-green-500 text-white border-0">
                        Save ${(product.originalPrice - displayPrice).toFixed(2)}
                    </Badge>
                )}
            </div>

            {/* Stock Indicator */}
            <div className="flex items-center gap-2">
                {selectedVariantData?.inStock ? (
                    <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            In Stock
                        </span>
                        {product.variants.find(v => v.id === selectedVariant)?.name === "30ml" && (
                            <span className="text-sm text-orange-600 dark:text-orange-400">
                                • Low stock
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                            Out of Stock
                        </span>
                    </>
                )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                {product.shortDescription}
            </p>

            {/* Variants */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-3">
                        Size:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant.id)}
                                disabled={!variant.inStock}
                                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${selectedVariant === variant.id
                                        ? "border-primary-400 bg-primary-50 dark:bg-primary-400/10 text-primary-400"
                                        : "border-gray-200 dark:border-dark-border hover:border-gray-300 text-gray-700 dark:text-dark-text-secondary"
                                    } ${!variant.inStock
                                        ? "opacity-50 cursor-not-allowed line-through"
                                        : ""
                                    }`}
                            >
                                {variant.name}
                                {variant.price !== product.price && (
                                    <span className="block text-xs mt-1">
                                        ${variant.price.toFixed(2)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-3">
                        Quantity:
                    </h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-dark-text-primary"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-x border-gray-200 dark:border-dark-border font-medium">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-dark-text-primary"
                            >
                                +
                            </button>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                            {selectedVariantData?.inStock ? "In stock" : "Out of stock"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                    size="lg"
                    className="flex-1 bg-primary-400 hover:bg-primary-500 text-white rounded-full py-3 text-lg"
                    onClick={handleAddToCart}
                    disabled={!selectedVariantData?.inStock}
                >
                    {itemInCart ? "Added to Cart" : "Add to Cart"}
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 rounded-full py-3 text-lg border-2"
                    onClick={handleBuyNow}
                    disabled={!selectedVariantData?.inStock}
                >
                    Buy Now
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-12 w-12"
                >
                    <Heart className="h-6 w-6" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-12 w-12"
                >
                    <Share2 className="h-6 w-6" />
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
                <div className="text-center">
                    <Truck className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
                <div className="text-center">
                    <RotateCcw className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-gray-500">Hassle-free</p>
                </div>
                <div className="text-center">
                    <Shield className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% protected</p>
                </div>
            </div>
        </div>
    )
}