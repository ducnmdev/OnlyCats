'use client'

import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { isValidPassword, doPasswordsMatch } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api/auth";


const Page = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const { token } = useParams();
    const router = useRouter();

    const { mutate: resetUserPassword, isPending } = useMutation({
        mutationFn: resetPassword,

        onSuccess: () => {
            toast.success("Password reset successfully!")

            setTimeout(() => {
                router.push("/login")
            }, 1500)
        },

        onError: (error: any) => {
            toast.error(error.message || "Something went wrong. Please try again.")
        },
    })

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        if (isPending) return

        if (!token || Array.isArray(token)) {
            toast.error("Invalid reset link.")
            return
        }

        if (!isValidPassword(password)) {
            toast.error(
                "Password must be at least 8 characters and contain only letters and numbers."
            )
            return
        }

        if (!doPasswordsMatch(password, confirmPassword)) {
            toast.error("Passwords do not match.")
            return
        }

        resetUserPassword({
            token,
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


                    <div className='max-w-md w-full bg-black/60 rounded-2xl shadow-xl overflow-hidden'
                    >
                        <div className='p-8 w-100'>
                            <h2 className='text-3xl text-sky-400 font-bold mb-6 text-center'>
                                Reset Password
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="relative">
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
                                        className="my-2"
                                        type={showPassword ? "text" : "password"}
                                        placeholder='New Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative">
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
                                        className="my-2"
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Confirm New Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className='w-full py-3 px-4 bg-sky-400 font-bold rounded-lg shadow-lg my-3 cursor-pointer'
                                    type='submit'
                                    disabled={isPending}
                                >
                                    {isPending ? "Resetting..." : "Set New Password"}
                                </button>
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        </div>


    );
};

export default Page;
