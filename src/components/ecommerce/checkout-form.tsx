"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CheckoutFormProps {
  onSuccess?: (orderId: string) => void
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user) {
      toast.error("Please sign in to checkout")
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)

    try {
      const subtotal = getTotalPrice()
      const shipping = 5.99
      const tax = subtotal * 0.08
      const total = subtotal + shipping + tax

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          subtotal,
          shipping,
          tax,
          total,
          shippingAddress,
          paymentMethod: 'credit-card',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()
      
      toast.success("Order placed successfully!")
      clearCart()
      
      if (onSuccess) {
        onSuccess(order.id)
      } else {
        router.push(`/orders/${order.id}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={(e) => setShippingAddress(prev => ({ ...prev, fullName: e.target.value }))}
          required
        />
        <Input
          placeholder="Address"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress(prev => ({ ...prev, address: e.target.value }))}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
            required
          />
          <Input
            placeholder="State"
            value={shippingAddress.state}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
            required
          />
        </div>
        <Input
          placeholder="ZIP Code"
          value={shippingAddress.zipCode}
          onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary-400 hover:bg-primary-500 text-white"
        disabled={isLoading || items.length === 0}
      >
        {isLoading ? "Placing Order..." : `Place Order - $${(getTotalPrice() + 5.99 + (getTotalPrice() * 0.08)).toFixed(2)}`}
      </Button>
    </form>
  )
}