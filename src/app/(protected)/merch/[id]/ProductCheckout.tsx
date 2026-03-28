"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { centsToDollars } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCheckoutSession } from "@/lib/api/payment";
import { Product } from "../../secret-dashboard/store/ExistingProducts";

const ProductCheckout = ({ product }: { product: Product }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const router = useRouter();

    const { mutate: checkout, isPending } = useMutation({
        mutationFn: createCheckoutSession,
        onSuccess: (data) => {
            if (data.url) {
                router.push(data.url);
            } else {
                toast.error("Error creating checkout session");
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Something went wrong");
        },
    });

    const handleBuyProduct = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        checkout({
            productId: product.id,
            size: selectedSize,
        });
    };

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <img src={product.image} alt="Product Image" className="h-96 object-cover rounded" />

            <div className='w-full'>
                <h1 className='text-2xl md:text-4xl font-bold'>
                    {product.name}
                </h1>

                <p className='text-muted-foreground text-base'>
                    ${centsToDollars(product.price)}
                </p>

                <Label className='mt-5 inline-block'>Size</Label>

                <Select onValueChange={setSelectedSize}>
                    <SelectTrigger className='w-45'>
                        <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='sm'>Small</SelectItem>
                        <SelectItem value='md'>Medium</SelectItem>
                        <SelectItem value='lg'>Large</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    className='mt-5 cursor-pointer'
                    disabled={isPending}
                    onClick={handleBuyProduct}
                >
                    {isPending ? "Processing..." : "Buy Now"}
                </Button>
            </div>
        </div>
    );
};

export default ProductCheckout;