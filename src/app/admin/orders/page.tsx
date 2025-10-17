import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react"

// This would normally come from your database
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: 86.97,
    status: "delivered" as const,
    items: 3,
    date: "2024-01-15",
    paymentStatus: "paid" as const,
  },
  {
    id: "ORD-002",
    customer: "Mike Chen", 
    email: "mike@example.com",
    amount: 42.99,
    status: "processing" as const,
    items: 1,
    date: "2024-01-14",
    paymentStatus: "paid" as const,
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    email: "emily@example.com",
    amount: 128.50,
    status: "shipped" as const,
    items: 4,
    date: "2024-01-13",
    paymentStatus: "paid" as const,
  },
  {
    id: "ORD-004",
    customer: "Alex Rodriguez",
    email: "alex@example.com",
    amount: 64.25,
    status: "pending" as const,
    items: 2,
    date: "2024-01-12",
    paymentStatus: "pending" as const,
  }
]

export default function AdminOrdersPage() {
  const getStatusConfig = (status: string) => {
    const config = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pending" },
      confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle, label: "Confirmed" },
      processing: { color: "bg-purple-100 text-purple-800", icon: ShoppingCart, label: "Processing" },
      shipped: { color: "bg-orange-100 text-orange-800", icon: Truck, label: "Shipped" },
      delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Delivered" },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Cancelled" },
    }
    return config[status as keyof typeof config] || config.pending
  }

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid' ? 'text-green-600' : 'text-yellow-600'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
            Orders
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mt-1">
            Manage customer orders and fulfillment
          </p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg"
              />
            </div>
            <input
              type="date"
              className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg"
            />
            <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
              <option>All Customers</option>
              <option>Regular Customers</option>
              <option>VIP Customers</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
        <CardHeader>
          <CardTitle>
            Recent Orders ({mockOrders.length} orders)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Order
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Payment
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {mockOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status)
                  const StatusIcon = statusConfig.icon
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                            {order.id}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                            {order.items} item{order.items !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                            {order.customer}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900 dark:text-dark-text-primary">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-900 dark:text-dark-text-primary">
                          ${order.amount.toFixed(2)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <select className="text-xs border border-gray-200 dark:border-dark-border rounded px-2 py-1 bg-white dark:bg-dark-bg">
                            <option>Update Status</option>
                            <option>Confirm</option>
                            <option>Process</option>
                            <option>Ship</option>
                            <option>Deliver</option>
                            <option>Cancel</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">324</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">12</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Processing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">8</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Shipped</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">15</p>
              </div>
              <Truck className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}