import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plus, Edit, Trash2, Search } from "lucide-react"
import { products } from "@/lib/products-data"
import Image from "next/image"

export default function AdminProductsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                        Products
                    </h1>
                    <p className="text-gray-600 dark:text-dark-text-secondary mt-1">
                        Manage your product catalog
                    </p>
                </div>
                <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-full flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {/* Search and Filters */}
            <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg"
                            />
                        </div>
                        <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
                            <option>All Categories</option>
                            <option>Skincare</option>
                            <option>Makeup</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white dark:bg-dark-bg">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Products Grid */}
            <Card className="bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
                <CardHeader>
                    <CardTitle>
                        Product Catalog ({products.length} products)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-dark-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                                        Product
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                                        Category
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
                                        Price
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
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-dark-border rounded-lg flex items-center justify-center flex-shrink-0">
                                                    {product.images[0] ? (
                                                        <Image
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            width={48}
                                                            height={48}
                                                            className="rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-dark-text-primary">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary line-clamp-1">
                                                        {product.shortDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-400/20 dark:text-primary-400">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                                                    ${product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.inStock
                                                ? 'bg-green-100 text-green-800 dark:bg-green-400/20 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-400/20 dark:text-red-400'
                                                }`}>
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
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