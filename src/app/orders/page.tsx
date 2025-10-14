// src/app/orders/page.tsx
import { Header } from "@/components/layout/header"
import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, Clock, CheckCircle, XCircle } from "lucide-react"

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 86.97,
      status: "delivered",
      items: 3
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      total: 42.99,
      status: "processing",
      items: 1
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return "text-green-600 bg-green-50"
      case 'processing':
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
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
              <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-gray-600 dark:text-dark-text-secondary text-sm">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-dark-text-secondary">
                        {order.items} item{order.items !== 1 ? 's' : ''} • ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Track Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}