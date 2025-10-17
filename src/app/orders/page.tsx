"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
  estimatedDelivery?: string
  trackingNumber?: string
  carrier?: string
  orderItems: Array<{
    id: string
    productName: string
    productImage: string
    quantity: number
    productPrice: number
  }>
  shippingFullName: string
}

export default function OrdersPage() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusConfig = (status: string) => {
    const config = {
      pending: { color: "text-yellow-600 bg-yellow-50", icon: Clock },
      confirmed: { color: "text-blue-600 bg-blue-50", icon: CheckCircle },
      processing: { color: "text-purple-600 bg-purple-50", icon: Package },
      shipped: { color: "text-orange-600 bg-orange-50", icon: Truck },
      delivered: { color: "text-green-600 bg-green-50", icon: CheckCircle },
      cancelled: { color: "text-red-600 bg-red-50", icon: XCircle },
      refunded: { color: "text-red-600 bg-red-50", icon: XCircle },
    }
    return config[status as keyof typeof config] || config.pending
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-dark-text-secondary">Loading orders...</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-primary-400">Orders</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              Track and manage your orders
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary mb-6">
                Start shopping to see your orders here
              </p>
              <Link href="/products">
                <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const statusConfig = getStatusConfig(order.status)
                const StatusIcon = statusConfig.icon
                
                return (
                  <div key={order.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusConfig.color} flex items-center gap-1`}>
                            <StatusIcon className="h-4 w-4" />
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                          Placed on {new Date(order.createdAt).toLocaleDateString()} • 
                          {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''} • 
                          ${order.total.toFixed(2)}
                        </p>
                        {order.estimatedDelivery && order.status !== 'delivered' && (
                          <p className="text-sm text-blue-600 mt-1">
                            Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="rounded-full">
                            View Details
                          </Button>
                        </Link>
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm" className="rounded-full">
                            Track Order
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Order Items Preview */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {order.orderItems.slice(0, 4).map((item) => (
                        <div key={item.id} className="flex items-center gap-2 bg-gray-50 dark:bg-dark-border px-3 py-2 rounded-lg min-w-0 flex-shrink-0">
                          <Package className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{item.productName}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.orderItems.length > 4 && (
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-dark-border px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-500">
                            +{order.orderItems.length - 4} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}