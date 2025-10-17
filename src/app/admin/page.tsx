// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Package, Users, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react"

interface AdminStats {
  totalRevenue: number
  productCount: number
  customerCount: number
  orderCount: number
  recentOrders: Array<{
    id: string
    customer: string
    amount: string
    status: string
  }>
  topProducts: Array<{
    name: string
    sales: number
    revenue: string
  }>
}

interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<any>
}

interface OrderItem {
  id: string
  customer: string
  amount: string
  status: string
}

interface ProductItem {
  name: string
  sales: number
  revenue: string
}

async function getAdminStats(): Promise<AdminStats | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/stats`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return null
  }
}

export default async function AdminDashboard() {
  const statsData = await getAdminStats()

  // Fallback to mock data if API fails
  const stats: StatItem[] = statsData ? [
    {
      title: "Total Revenue",
      value: `$${(statsData.totalRevenue || 0).toFixed(2)}`,
      change: "+12%",
      trend: "up" as const,
      icon: BarChart3,
    },
    {
      title: "Products",
      value: statsData.productCount?.toString() || "156",
      change: "+8%",
      trend: "up" as const,
      icon: Package,
    },
    {
      title: "Customers",
      value: statsData.customerCount?.toString() || "2,841",
      change: "+23%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Orders",
      value: statsData.orderCount?.toString() || "324",
      change: "-2%",
      trend: "down" as const,
      icon: ShoppingCart,
    },
  ] : [
    // Mock data fallback
    {
      title: "Total Revenue",
      value: "$12,426",
      change: "+12%",
      trend: "up" as const,
      icon: BarChart3,
    },
    {
      title: "Products",
      value: "156",
      change: "+8%",
      trend: "up" as const,
      icon: Package,
    },
    {
      title: "Customers",
      value: "2,841",
      change: "+23%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Orders",
      value: "324",
      change: "-2%",
      trend: "down" as const,
      icon: ShoppingCart,
    },
  ]

  const recentOrders: OrderItem[] = statsData?.recentOrders || [
    { id: "ORD-001", customer: "Sarah Johnson", amount: "$86.97", status: "Delivered" },
    { id: "ORD-002", customer: "Mike Chen", amount: "$42.99", status: "Processing" },
    { id: "ORD-003", customer: "Emily Davis", amount: "$128.50", status: "Shipped" },
    { id: "ORD-004", customer: "Alex Rodriguez", amount: "$64.25", status: "Pending" },
  ]

  const topProducts: ProductItem[] = statsData?.topProducts || [
    { name: "Radiant Glow Serum", sales: 142, revenue: "$6,104" },
    { name: "Hydrating Lip Oil", sales: 98, revenue: "$2,442" },
    { name: "Satin Finish Foundation", sales: 87, revenue: "$3,392" },
    { name: "Volumizing Mascara", sales: 76, revenue: "$2,203" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: StatItem) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          
          return (
            <Card key={stat.title} className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                  {stat.value}
                </div>
                <div className={`flex items-center text-xs ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: OrderItem) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-dark-text-primary">
                      {order.amount}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product: ProductItem, index: number) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-400 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-dark-text-primary">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}