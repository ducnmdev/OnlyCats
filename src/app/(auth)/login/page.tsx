'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMe, login } from "@/lib/api/auth"

const Page = () => {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShow, setIsShow] = useState(false)
    const [showResend, setShowResend] = useState(false)

    const handleResend = async () => {
        if (!email) {
            toast.error("Please enter your email first.")
            return
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message || "Failed to resend verification email.")
                return
            }

            toast.success("Verification email sent successfully!")
            setTimeout(() => {
                router.push("/verify-email");
            }, 1000);

        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        }
    }

    const queryClient = useQueryClient();

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: login,

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Logged in successfully!");

            const stripeUrl = localStorage.getItem("stripeRedirectUrl");

            if (stripeUrl) {
                const user = await fetchMe();

                if (user) {
                    router.replace("/auth/callback");
                } else {
                    setTimeout(() => router.replace("/auth/callback"), 300);
                }
            } else {
                router.replace("/");
            }
        },

        onError: (error: any) => {
            toast.error(error.message);

            if (error.status === 403) {
                setShowResend(true);
            }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser({ email, password });
    };

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

            <div className="relative z-10 flex-1 flex justify-center items-center overflow-hidden bg-[#00b0f0a6] bg-noise">
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
                        className="w-80 z-0 pointer-events-none select-none"
                    />

                    <p className="text-2xl text-balance text-white">
                        Welcome back! Saddle up and log in.
                    </p>

                    <Card className="w-full max-w-sm bg-white/60 text-black mt-6 border-0">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Log in</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">

                                    {/* EMAIL */}
                                    <div className="grid gap-2 relative">
                                        <Mail className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />
                                        <Input
                                            className="bg-white/50! pl-9"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="grid gap-2 relative">
                                        <LockKeyhole className="absolute h-5 w-5 text-muted left-2 top-1/2 -translate-y-1/2" />

                                        {isShow ? (
                                            <Eye
                                                onClick={() => setIsShow(false)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        ) : (
                                            <EyeOff
                                                onClick={() => setIsShow(true)}
                                                className="absolute h-5 w-5 text-muted cursor-pointer right-2 top-1/2 -translate-y-1/2"
                                            />
                                        )}

                                        <Input
                                            className="bg-white/50! pl-9"
                                            type={isShow ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>

                                    {showResend &&
                                        <button
                                            type="button"
                                            className="text-sky-500 cursor-pointer"
                                            onClick={handleResend}>
                                            Resend verification email
                                        </button>
                                    }

                                    <Button
                                        type="submit"
                                        className="w-full text-lg cursor-pointer"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Logging in..." : "Log in"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-2">
                            <p className="text-sm text-gray-600 cursor-pointer">
                                <Link href='/forgot-password'>
                                    Forgot password?
                                </Link>
                            </p>

                            <div className="w-full border-b py-1"></div>

                            <p className="text-muted">New to OnlyCat?</p>
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

export default Page
