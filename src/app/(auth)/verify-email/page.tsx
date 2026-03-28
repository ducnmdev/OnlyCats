'use client'
import Image from "next/image";
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/lib/api/auth";


const Page = () => {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter();

    const { mutate: verifyEmailMutation, isPending } = useMutation({
        mutationFn: verifyEmail,

        onSuccess: () => {
            toast.success("Email verified successfully!");

            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 1000);
        },

        onError: (error: any) => {
            toast.error(error.message);
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        },
    });

    const handleChange = (index: number, value: string): void => {
        if (code.every(digit => digit !== "")) {
            const newCode = ["", "", "", "", "", ""];
            newCode[0] = value.slice(-1);
            setCode(newCode);
            inputRefs.current[1]?.focus();
            return;
        }
        if (!/^\d*$/.test(value)) return;
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e?: FormEvent<HTMLFormElement>): void => {
        e?.preventDefault();

        const verificationCode = code.join("");

        if (verificationCode.length !== 6) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }

        if (!/^\d{6}$/.test(verificationCode)) {
            toast.error("Verification code must contain only numbers.");
            return;
        }

        verifyEmailMutation(verificationCode);
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

                    <div className="max-w-md w-full bg-black/40 rounded-2xl overflow-hidden">
                        <div className=" rounded-2xl shadow-2xl p-8 w-full max-w-md">
                            <h2 className="text-3xl font-bold mb-6 text-center text-sky-400 ">
                                Verify Your Email
                            </h2>

                            <p className="text-center mb-6">
                                Enter the 6-digit code sent to your email address.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex justify-between">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            maxLength={6}
                                            value={digit}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleChange(index, e.target.value)
                                            }
                                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                                                handleKeyDown(index, e)
                                            }
                                            className="w-12 h-12 text-center text-2xl font-bold bg-black/40 text-white border-2 border-gray-600 rounded-lg focus:outline-none"
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-sky-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 cursor-pointer focus:ring-opacity-50 disabled:opacity-50"
                                >
                                    {isPending ? "Verifying..." : "Verify Email"}
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
