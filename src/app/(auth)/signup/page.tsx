'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Eye, EyeOff, LockKeyhole, Mail, User
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { isValidEmail, isValidPassword, doPasswordsMatch } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { signup } from "@/lib/api/auth"

const page = () => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { mutate: signupUser, isPending } = useMutation({
        mutationFn: signup,

        onSuccess: () => {
            toast.success("Account created! Please verify your email.")
            setTimeout(() => {
                router.push("/verify-email")
            }, 1000)
        },

        onError: (error: any) => {
            toast.error(error.message || "Something went wrong. Please try again.")
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isPending) return

        if (!fullName.trim()) {
            toast.error("Full name is required.")
            return
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.")
            return
        }

        if (!isValidPassword(password)) {
            toast.error("Password must be at least 8 characters and contain only letters and numbers.")
            return
        }

        if (!doPasswordsMatch(password, confirmPassword)) {
            toast.error("Passwords do not match.")
            return
        }

        signupUser({
            name: fullName.trim(),
            email: email.trim(),
            password,
        })
    }

    return (
        <div className="flex h-screen w-full">
            <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
                <Image
                    src={"/featured/featured14.jpg"}
                    alt="Cat"
                    fill
                    className="object-cover opacity-90 pointer-events-none select-none h-full -scale-x-100"
                />
            </div>

            <div
                className="relative z-10 flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] bg-noise">
                <img
                    src="/of-logo.svg"
                    alt="OnlyCat Logo"
                    className="absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2] pointer-events-none select-none"
                />

                <div className="flex flex-col gap-2 px-4 mx-auto justify-center items-center text-center md:text-start font-semibold">
                    <Image
                        src={"/onlycat1.png"}
                        alt="OnlyCat Logo"
                        width={769}
                        height={182}
                        className="w-80 pointer-events-none select-none"
                    />

                    <p className="text-2xl text-balance text-white">
                        Join OnlyCat Today 🐈
                    </p>

                    <Card className="w-[384px] max-w-sm bg-white/60 text-black mt-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Sign up
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5">
                                    <div className="relative">
                                        <User className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        <Input
                                            className="bg-white/40! pl-9"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Mail className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        <Input
                                            className="bg-white/40! pl-9"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <LockKeyhole className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        {showPassword ? (
                                            <Eye
                                                onClick={() => setShowPassword(false)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        ) : (
                                            <EyeOff
                                                onClick={() => setShowPassword(true)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        )}
                                        <Input
                                            className="bg-white/40! pl-9"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                        />

                                    </div>

                                    <div className="relative">
                                        <LockKeyhole className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        {showPassword ? (
                                            <Eye
                                                onClick={() => setShowPassword(false)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        ) : (
                                            <EyeOff
                                                onClick={() => setShowPassword(true)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        )}
                                        <Input
                                            className="bg-white/40! pl-9"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full text-lg cursor-pointer mt-5"
                                >
                                    {isPending ? "Creating..." : "Create account"}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-3">
                            <div className="w-full border-b py-1" />
                            <p className="text-muted">
                                Already have an account?
                            </p>

                            <Link href="/login" className="text-sky-500">
                                Log in
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default page
