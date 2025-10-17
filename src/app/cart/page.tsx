"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
                  Continue Shopping
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
            Shopping <span className="text-primary-400">Cart</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Your Items ({getTotalItems()})
              </h2>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={item.image || "/placeholder-product.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary-400 transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-3">
                      {item.category}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <span className="text-lg font-bold text-primary-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link href="/products">
                <Button variant="outline" className="rounded-full">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 space-y-6">
              <h2 className="text-2xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                  />
                  <Button variant="outline" className="rounded-lg">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button
                  className="w-full bg-primary-400 hover:bg-primary-500 text-white rounded-full py-3 text-lg"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t text-center text-xs">
                <div>
                  <div className="font-semibold mb-1">🚚 Free Shipping</div>
                  <div className="text-gray-500">On orders over $50</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">🔒 Secure Checkout</div>
                  <div className="text-gray-500">256-bit encryption</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">↩️ Easy Returns</div>
                  <div className="text-gray-500">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}