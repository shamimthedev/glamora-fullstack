'use client'
import Link from "next/link"
import { Sparkles, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CartSidebar } from "@/components/ecommerce/cart-sidebar"
import { UserDropdown } from "./user-dropdown"

export function Header() {
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent">
              Glamora
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary-400"
          >
            Shop All
          </Link>
          <Link
            href="/story"
            className="text-sm font-medium transition-colors hover:text-primary-400"
          >
            Our Story
          </Link>
          <Link
            href="/ingredients"
            className="text-sm font-medium transition-colors hover:text-primary-400"
          >
            Ingredients
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors hover:text-primary-400"
          >
            Blog
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>

          {/* Replace the old cart button with our new CartSidebar */}
          <CartSidebar />

          {/* User Dropdown */}
          <UserDropdown />

          <ThemeToggle />

          {/* Mobile Menu Button - Visible only on mobile */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}