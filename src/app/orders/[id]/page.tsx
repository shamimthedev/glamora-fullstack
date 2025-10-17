// src/app/orders/[id]/page.tsx
"use client"

import { use } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface OrderPageProps {
  params: Promise<{
    id: string
  }>
}

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  paymentMethod: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingFullName: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZipCode: string
  shippingCountry: string
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  createdAt: string
  orderItems: Array<{
    id: string
    productName: string
    productImage: string
    productPrice: number
    quantity: number
  }>
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = use(params)
  const { data: session } = useSession()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data)
        } else if (response.status === 404) {
          notFound()
        }
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto text-center py-16">
            <p className="text-gray-600 dark:text-dark-text-secondary">Loading order details...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!order) {
    notFound()
  }

  const getStatusConfig = (status: string) => {
    const config = {
      pending: { color: "text-yellow-600 bg-yellow-50", icon: Clock, label: "Pending" },
      confirmed: { color: "text-blue-600 bg-blue-50", icon: CheckCircle, label: "Confirmed" },
      processing: { color: "text-purple-600 bg-purple-50", icon: Package, label: "Processing" },
      shipped: { color: "text-orange-600 bg-orange-50", icon: Truck, label: "Shipped" },
      delivered: { color: "text-green-600 bg-green-50", icon: CheckCircle, label: "Delivered" },
      cancelled: { color: "text-red-600 bg-red-50", icon: Clock, label: "Cancelled" },
      refunded: { color: "text-red-600 bg-red-50", icon: Clock, label: "Refunded" },
    }
    return config[status as keyof typeof config] || config.pending
  }

  const statusConfig = getStatusConfig(order.status)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Order Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusConfig.color} flex items-center gap-1`}>
                  <statusConfig.icon className="h-4 w-4" />
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex gap-3">
              {order.trackingNumber && (
                <Button variant="outline" className="rounded-full">
                  Track Order
                </Button>
              )}
              <Link href="/orders">
                <Button variant="outline" className="rounded-full">
                  Back to Orders
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100 dark:border-dark-border last:border-0">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-dark-border rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-dark-text-primary truncate">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-dark-text-primary">
                          ${(item.productPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.productPrice} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <h2 className="text-xl font-bold mb-4">Order Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {order.status === 'shipped' && order.trackingNumber && (
                    <div className="flex items-center gap-3 text-orange-600">
                      <Truck className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                        {order.carrier && <p className="text-sm text-gray-500">Carrier: {order.carrier}</p>}
                      </div>
                    </div>
                  )}
                  
                  {order.estimatedDelivery && (
                    <div className="flex items-center gap-3 text-blue-600">
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary-400" />
                  <h3 className="font-semibold">Shipping Address</h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary space-y-1">
                  <p>{order.shippingFullName}</p>
                  <p>{order.shippingAddress}</p>
                  <p>
                    {order.shippingCity}, {order.shippingState} {order.shippingZipCode}
                  </p>
                  <p>{order.shippingCountry}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-primary-400" />
                  <h3 className="font-semibold">Payment Method</h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  <p className="capitalize">{order.paymentMethod.replace('-', ' ')}</p>
                  <p className={`capitalize ${
                    order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                <h3 className="font-semibold mb-3">Order Total</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
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