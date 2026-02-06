'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const page = () => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div className="flex h-screen w-full">
            <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
                <Image
                    src={"/horse-1.png"}
                    alt="Horse"
                    fill // lấp đầy container cha ~ w,h=100
                    className="object-cover opacity-90 pointer-events-none select-none h-full -scale-x-100" // object-cover: phủ kín container cha
                />
            </div>

            <div
                className="relative z-10 flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] bg-noise" // bg-noise trong suốt nên k đè lên màu bg
            >
                <img src="/of-logo.svg" alt="OnlyHorse Logo"
                    className="absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2] pointer-events-none select-none"
                />
                <div className="flex flex-col gap-2 px-4 mx-auto justify-center items-center text-center md:text-start font-semibold">
                    {/*component Image set width heigt để tránh layout shift */}
                    <Image
                        src={"/onlyhorse.png"}
                        alt="OnlyHorse Logo"
                        width={769}
                        height={182}
                        className="w-80 z-0 pointer-events-none select-none"
                    />

                    <p className="text-2xl text-balance text-white">
                        Welcome back! Saddle up and log in.
                    </p>

                    <Card className="w-full max-w-sm bg-white/80 text-black mt-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Log in</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2 relative">
                                        <Mail
                                            className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2"
                                        />
                                        <Input
                                            className="bg-white! pl-9"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2 relative">
                                        <LockKeyhole
                                            className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2"
                                        />
                                        {isShow
                                            ? <Eye
                                                onClick={() => setIsShow(!isShow)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2" />
                                            : <EyeOff
                                                onClick={() => setIsShow(!isShow)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2" />
                                        }
                                        <Input
                                            className="bg-white! pl-9"
                                            id="password"
                                            type={isShow ? 'text' : 'password'}
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full text-lg cursor-pointer">
                                Log in
                            </Button>
                            <p className="text-sm text-gray-600">Forgot password?</p>
                            <div className="w-full border-b py-1"></div>
                            <p className="text-muted">New to OnlyHorse?</p>
                            <Link href={'/signup'} className="text-sky-500">
                                Sign up
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default page