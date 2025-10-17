// app/debug/database.tsx
import { prisma } from '@/lib/prisma'

export default async function DatabaseDebug() {
  const users = await prisma.user.findMany()
  const products = await prisma.product.findMany({
    include: { variants: true }
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Database Debug</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}