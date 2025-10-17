"use client"

import { Minus, Plus, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/stores/cart-store"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

export function CartSidebar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartStore()

  // Fix hydration by only showing cart count after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const totalItems = mounted ? getTotalItems() : 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingCart className="h-5 w-5" />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-400 text-xs text-white flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({mounted ? getTotalItems() : 0})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-dark-text-secondary mb-4">
                Add some beautiful products to your cart
              </p>
              <Button
                onClick={() => setOpen(false)}
                className="bg-primary-400 hover:bg-primary-500"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg bg-white dark:bg-dark-card">
                  {/* Product Image */}
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image || "/placeholder-product.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-primary-400 font-semibold">
                      ${item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="text-sm w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${mounted ? getTotalPrice().toFixed(2) : '0.00'}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                Shipping & taxes calculated at checkout
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/checkout">
                <Button
                  className="w-full bg-primary-400 hover:bg-primary-500 text-white rounded-full"
                >
                  Checkout
                </Button>
              </Link>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}