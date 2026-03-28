'use client'

import { useParams, notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import BaseLayout from "@/components/BaseLayout"
import ProductCard from "@/components/ProductCard"
import UnderlinedText from "@/components/decorators/UnderlinedText"
import ProductCheckout from "./ProductCheckout"

import { fetchProductById } from "@/lib/api/product"

const Page = () => {

	const params = useParams()
	const id = params.id as string

	const { data, isLoading, error } = useQuery({
		queryKey: ["product", id],
		queryFn: () => fetchProductById(id),
		enabled: !!id
	})

	if (error) return notFound()

	if (isLoading || !data) return null

	const currentProduct = data.currentProduct
	const products = data.products

	return (
		<BaseLayout renderRightPanel={false}>
			<div className="px-3 md:px-7 my-20">

				<ProductCheckout product={currentProduct} />

				<h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
					More product from{" "}
					<UnderlinedText className="decoration-wavy underline-offset-8">
						OnlyCat
					</UnderlinedText>
				</h1>

				<div className="grid gap-5 grid-cols-1 md:grid-cols-2">
					{products?.map((product: any) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

			</div>
		</BaseLayout>
	)
}

export default Page