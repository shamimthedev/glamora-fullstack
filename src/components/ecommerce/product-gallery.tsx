"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  product: {
    images: string[]
    name: string
  }
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleImageClick = () => {
    setIsZoomed(true)
  }

  const handleCloseZoom = () => {
    setIsZoomed(false)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-border group">
          <button
            onClick={handleImageClick}
            className="w-full h-full relative block"
          >
            <Image
              src={product.images[selectedImage] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </button>
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
            {selectedImage + 1} / {product.images.length}
          </div>

          {/* Zoom Indicator */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <ZoomIn className="h-4 w-4" />
            Click to zoom
          </div>
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

      {/* Custom Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={handleCloseZoom}
        >
          <div 
            className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleCloseZoom}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Zoomed Image */}
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
              <Image
                src={product.images[selectedImage] || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedImage((prev) => 
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )}
                >
                  ←
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedImage((prev) => 
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )}
                >
                  →
                </Button>
              </>
            )}

            {/* Thumbnail Strip in Zoom Modal */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative aspect-square w-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-white ring-2 ring-white/50"
                      : "border-gray-400 hover:border-gray-200"
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
        </div>
      )}
    </>
  )
}