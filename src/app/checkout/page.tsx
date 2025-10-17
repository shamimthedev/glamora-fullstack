"use client"

import { Header } from "@/components/layout/header"
import { useCartStore } from "@/lib/stores/cart-store"
import { CheckoutForm } from "@/components/ecommerce/checkout-form"
import { Package, CreditCard, Truck } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice } = useCartStore()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (items.length === 0) {
    redirect('/cart')
  }

  const subtotal = getTotalPrice()
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <CheckoutForm onSuccess={(orderId) => {
                  // This will be called when order is successfully created
                  console.log('Order created:', orderId)
                }} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <div className="flex items-center justify-center gap-6 text-gray-400">
                  <div className="text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <Truck className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Package className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}