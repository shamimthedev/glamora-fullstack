// src/app/profile/page.tsx
import { Header } from "@/components/layout/header"
import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Edit } from "lucide-react"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              My <span className="text-primary-400">Profile</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-8">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-primary-400 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{user.name || "User"}</h2>
                <p className="text-gray-600 dark:text-dark-text-secondary">{user.email}</p>
              </div>
              <Button variant="outline" className="rounded-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-border rounded-lg">
                <User className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Full Name</p>
                  <p className="font-medium">{user.name || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-border rounded-lg">
                <Mail className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-border rounded-lg">
                <Calendar className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Member Since</p>
                  <p className="font-medium">Recently joined</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  Order History
                </Button>
                <Button variant="outline" className="justify-start">
                  Wishlist
                </Button>
                <Button variant="outline" className="justify-start">
                  Address Book
                </Button>
                <Button variant="outline" className="justify-start">
                  Payment Methods
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}