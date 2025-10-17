import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  userName: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

interface ProductReviewsProps {
  productId: string
  averageRating: number
  reviewCount: number
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    title: "Absolutely love this serum!",
    comment: "My skin has never looked better. The glow is real and it doesn't feel sticky at all. Will definitely repurchase!",
    verified: true
  },
  {
    id: "2",
    userName: "Jessica T.",
    rating: 4,
    date: "2024-01-10",
    title: "Great results, slight fragrance",
    comment: "Really improved my skin texture and brightness. Only giving 4 stars because I wish it was fragrance-free.",
    verified: true
  },
  {
    id: "3",
    userName: "Maria L.",
    rating: 5,
    date: "2024-01-05",
    title: "Worth every penny",
    comment: "I've tried many vitamin C serums and this is by far the best. No irritation, just results. My dark spots are fading!",
    verified: true
  }
]

export function ProductReviews({ averageRating, reviewCount }: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, count: 84, percentage: 65 },
    { stars: 4, count: 32, percentage: 25 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 }
  ]

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Rating Summary */}
        <div className="flex-shrink-0 bg-gray-50 dark:bg-dark-card p-6 rounded-2xl text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.floor(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
            Based on {reviewCount} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-gray-600 dark:text-dark-text-secondary">
                {stars} stars
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-gray-500 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <Button className="bg-primary-400 hover:bg-primary-500 text-white rounded-full">
        Write a Review
      </Button>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 dark:border-dark-border pb-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-dark-text-primary">
                    {review.userName}
                  </h4>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <h5 className="font-medium text-gray-900 dark:text-dark-text-primary mb-2">
              {review.title}
            </h5>
            <p className="text-gray-600 dark:text-dark-text-secondary leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <Button variant="outline" className="rounded-full">
          Load More Reviews
        </Button>
      </div>
    </div>
  )
}