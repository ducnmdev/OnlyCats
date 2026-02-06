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

const page = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex h-screen w-full">
            <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
                <Image
                    src={"/horse-1.png"}
                    alt="Horse"
                    fill
                    className="object-cover opacity-90 pointer-events-none select-none h-full -scale-x-100"
                />
            </div>

            <div
                className="relative z-10 flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] bg-noise">
                <img
                    src="/of-logo.svg"
                    alt="OnlyHorse Logo"
                    className="absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2] pointer-events-none select-none"
                />

                <div className="flex flex-col gap-2 px-4 mx-auto justify-center items-center text-center md:text-start font-semibold">
                    <Image
                        src={"/onlyhorse.png"}
                        alt="OnlyHorse Logo"
                        width={769}
                        height={182}
                        className="w-80 pointer-events-none select-none"
                    />

                    <p className="text-2xl text-balance text-white">
                        Join OnlyHorse Today 🐎
                    </p>

                    <Card className="w-[384px] max-w-sm bg-white/80 text-black mt-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Sign up
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-5">
                                    <div className="relative">
                                        <User className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        <Input
                                            className="bg-white! pl-9"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Mail className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        <Input
                                            className="bg-white! pl-9"
                                            type="email"
                                            placeholder="Email"
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
                                            className="bg-white! pl-9"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
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
                                            className="bg-white! pl-9"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>

                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-3">
                            <Button className="w-full text-lg cursor-pointer">
                                Create account
                            </Button>
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
