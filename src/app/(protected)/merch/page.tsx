'use client'

import BaseLayout from "@/components/BaseLayout"
import ProductCard from "@/components/ProductCard"
import UnderlinedText from "@/components/decorators/UnderlinedText"
import { fetchAllPublicProducts } from "@/lib/api/product"
import { useQuery } from "@tanstack/react-query"

const Page = () => {

	const { data: products, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllPublicProducts,
	})

	return (
		<BaseLayout renderRightPanel={false}>
			<div className='px-3 md:px-10 my-10'>
				<h1 className='text-3xl text-center my-5 font-bold tracking-tight'>
					Our <UnderlinedText className='decoration-wavy'>Products</UnderlinedText>
				</h1>

				<div className='grid gap-5 grid-cols-1 md:grid-cols-2'>

					{products?.map((product: any) => (
						<ProductCard key={product.id} product={product} />
					))}

				</div>
			</div>
		</BaseLayout>
	)
}

export default Page