"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  product: {
    images: string[]
    name: string
  }
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-border group">
        <Image
          src={product.images[selectedImage] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        />
        
        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>

        {/* Badges could go here */}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-primary-400 ring-2 ring-primary-400/20"
                : "border-gray-200 dark:border-dark-border hover:border-gray-300"
            }`}
          >
            <Image
              src={image || "/placeholder-product.jpg"}
              alt={`${product.name} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}