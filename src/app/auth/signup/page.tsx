"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SignUpFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function SignUpPage() {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match", {
                description: "Please make sure your passwords match.",
            })
            setIsLoading(false)
            return
        }

        try {
            // Remove client-side hashing - do it on the server instead
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password, // Send plain password, hash on server
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success("Account created!", {
                    description: "Your account has been created successfully.",
                })

                const signInResult = await signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                })

                if (signInResult?.ok) {
                    router.push('/')
                    router.refresh()
                }
            } else {
                toast.error("Registration failed", {
                    description: result.message || "Please try again.",
                })
            }
        } catch {
            toast.error("Something went wrong", {
                description: "Please try again later.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: '/' })
        } catch {
            toast.error("Google sign in failed", {
                description: "Please try again.",
            })
        }
    }

    return (
        <div className="min-h-screen">
            <Header />

            <main className="container py-16">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="h-8 w-8 text-primary-400" />
                            <span className="text-2xl font-bold">Glamora</span>
                        </div>
                        <h1 className="text-3lin font-bold mb-2">Create Account</h1>
                        <p className="text-gray-600 dark:text-dark-text-secondary">
                            Join us to discover beautiful products
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-dark-border">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 pr-10 rounded-lg"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary-400 hover:bg-primary-500 text-white rounded-lg py-3"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-dark-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-dark-card text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign In */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-lg py-3"
                            onClick={handleGoogleSignIn}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* Sign In Link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600 dark:text-dark-text-secondary">
                                Already have an account?{" "}
                            </span>
                            <Link href="/auth/signin" className="text-primary-400 hover:text-primary-500 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}