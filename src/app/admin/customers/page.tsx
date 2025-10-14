import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Search, Mail, Phone, Calendar, Edit } from "lucide-react"

const mockCustomers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: 864.50,
    joined: "2023-03-15",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com", 
    phone: "+1 (555) 234-5678",
    orders: 8,
    totalSpent: 422.75,
    joined: "2023-06-22",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 345-6789",
    orders: 3,
    totalSpent: 228.90,
    joined: "2023-11-05",
    status: "active" as const,
  },
  {
    id: "4", 
    name: "Alex Rodriguez",
    email: "alex@example.com",
    phone: "+1 (555) 456-7890",
    orders: 1,
    totalSpent: 64.25,
    joined: "2024-01-10",
    status: "inactive" as const,
  }
]

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mt-1">
            Manage your customer database
          </p>
        </div>
        <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-full flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Export Customers
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">2,841</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">2,654</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">New This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">187</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">$68.42</p>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg"
              />
            </div>
            <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>VIP</option>
            </select>
            <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
              <option>Sort by: Recent</option>
              <option>Sort by: Name</option>
              <option>Sort by: Orders</option>
              <option>Sort by: Total Spent</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
        <CardHeader>
          <CardTitle>
            Customer List ({mockCustomers.length} customers)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Joined
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {mockCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                          ID: {customer.id}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(customer.joined).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                        ${customer.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-400/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-400/20 dark:text-gray-400'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          View Profile
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}