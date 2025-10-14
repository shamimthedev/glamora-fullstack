// app/admin/layout.tsx
import { getCurrentUser } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'
import { AdminLayoutClient } from '@/components/layout/admin-layout-client'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // Redirect if not authenticated
  if (!user) {
    redirect('/auth/signin')
  }

  // Redirect if not admin
  if (user.email !== 'admin@glamora.com') {
    redirect('/')
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}