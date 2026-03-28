'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import { forgotPassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";


const Page = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { mutate: sendResetLink, isPending } = useMutation({
        mutationFn: forgotPassword,

        onSuccess: () => {
            toast.success("If an account exists, a reset link has been sent.")
            setIsSubmitted(true)
        },

        onError: () => {
            toast.error("Something went wrong. Please try again.")
        },
    })

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        if (isPending) return

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.")
            return
        }

        sendResetLink(email.trim())
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


                    <div className='max-w-md w-full bg-black/40 rounded-2xl shadow-xl overflow-hidden'
                    >
                        <div className='p-8'>
                            <h2 className='text-3xl font-bold mb-6 text-center text-sky-400'>
                                Forgot Password
                            </h2>

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit}>
                                    <p className='mb-6 text-center'>
                                        Enter your email address and we'll send you a link to reset your password.
                                    </p>
                                    <Input
                                        type='email'
                                        placeholder='Email Address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full bg-sky-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg mt-5 cursor-pointer"
                                    >
                                        {isPending ? "Sending..." : "Send Reset Link"}
                                    </button>
                                </form>
                            ) : (
                                <div className='text-center'>
                                    <div className='w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4'
                                    >
                                        <Mail className='h-8 w-8 text-white' />
                                    </div>
                                    <p className='text-gray-300 mb-6'>
                                        If an account exists for {email}, you will receive a password reset link shortly.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className='px-8 py-4 bg-black/40 flex justify-center'>
                            <Link href={"/login"} className='text-sm text-sky-400 flex items-center'>
                                <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                            </Link>
                        </div>
                    </div>



                </div>
            </div>
        </div>


    );
};

export default Page;
