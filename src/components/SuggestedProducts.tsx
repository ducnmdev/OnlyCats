import { useQuery } from "@tanstack/react-query"
import SuggestedProduct from "./SuggestedProduct"
import { fetchAllPublicProducts } from "@/lib/api/product"
import { Product } from "@/app/(protected)/secret-dashboard/store/ExistingProducts"

const SuggestedProducts = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllPublicProducts,
    })

    return (
        <div className="lg:w-2/5 hidden lg:flex flex-col gap-3 px-2 sticky top-0 right-0 h-screen ml-3">
            <div className="flex flex-col gap-2 mt-20">
                <p className="uppercase text-muted-foreground font-semibold tracking-tight">Recommended Products</p>
                <div className="grid grid-cols-2 gap-4">
                    {products?.map((product: Product) => (
                        <SuggestedProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestedProducts