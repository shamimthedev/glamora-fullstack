"use client"

import { Toaster } from "sonner"

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        className: 'text-sm font-medium',
      }}
    />
  )
}