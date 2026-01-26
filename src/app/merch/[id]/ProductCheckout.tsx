'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { centsToDollars } from "@/lib/utils"
import { useState } from "react"

const ProductCheckout = ({ product }: { product: any }) => {
    const [selectedSize, setSelectedSize] = useState<null | string>(null)
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <img src={product.image} alt="Product Image" className="h-96 object-cover rounded" />

            <div className="w-full">
                <h1 className="text-2xl md:text-4xl font-bold">
                    {product.name}
                </h1>

                <p className="text-muted-foreground text-base">
                    {centsToDollars(product.price)}
                </p>
                <Label className="mt-5 inline-block">Size</Label>

                <Select>
                    <SelectTrigger className="w-45 focus:ring-0">
                        <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    className="mt-5 text-white px-5 py-2 rounded-md"
                    size={'sm'}
                    onClick={() => alert("Bought!" + selectedSize)}
                >
                    Buy Now
                </Button>
            </div>
        </div>
    )
}
export default ProductCheckout