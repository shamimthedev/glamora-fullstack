"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { useOrderStore } from "@/lib/stores/order-store"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { createOrder } = useOrderStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit-card"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheckout = async () => {
    if (!session?.user) {
      toast.error("Please sign in to complete your order")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create order
      const orderId = createOrder({
        userId: session.user.id!,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: item.quantity
        })),
        total: getTotalPrice() * 1.08, // Including tax
        subtotal: getTotalPrice(),
        shipping: 0, // Free shipping
        tax: getTotalPrice() * 0.08,
        status: 'confirmed',
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: "United States"
        },
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'paid',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        trackingNumber: `TRK${Date.now()}`,
        carrier: "USPS"
      })

      // Clear cart
      clearCart()

      toast.success("Order placed successfully!", {
        description: `Your order #${orderId} has been confirmed.`,
      })

      // Redirect to order confirmation
      window.location.href = `/orders/${orderId}`
      
    } catch (error) {
      toast.error("Payment failed", {
        description: "Please try again or use a different payment method.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">No items to checkout</h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
            Your cart is empty. Add some products to proceed with checkout.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
              Shop Products
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-400 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <span className="text-sm font-medium">Cart</span>
            </div>
            <div className="w-16 h-1 bg-primary-400"></div>
            <div className="text-center">
              <div className="w-10 h-10 bg-primary-400 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <span className="text-sm font-medium">Checkout</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <span className="text-sm font-medium text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit-card" 
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                    className="text-primary-400" 
                  />
                  <span>Credit Card</span>
                </div>
                <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="paypal" 
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="text-primary-400" 
                  />
                  <span>PayPal</span>
                </div>
                <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="apple-pay" 
                    checked={formData.paymentMethod === 'apple-pay'}
                    onChange={handleInputChange}
                    className="text-primary-400" 
                  />
                  <span>Apple Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Actions */}
            <div className="space-y-4">
              <Button 
                className="w-full bg-primary-400 hover:bg-primary-500 text-white rounded-full py-3 text-lg flex items-center justify-center gap-2"
                onClick={handleCheckout}
                disabled={isProcessing || !formData.fullName || !formData.address}
              >
                <Lock className="h-5 w-5" />
                {isProcessing ? "Processing..." : `Pay $${(getTotalPrice() * 1.08).toFixed(2)}`}
              </Button>
              
              <Link href="/cart">
                <Button variant="outline" className="w-full rounded-full flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Button>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-500">
              <Lock className="h-4 w-4 inline mr-1" />
              Your payment information is secure and encrypted
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}