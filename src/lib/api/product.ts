export const fetchAllProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data.products;
};

type CreateProductInput = {
  name: string;
  image: string;
  price: string;
};

export const createProduct = async (body: CreateProductInput) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/add-product`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data.product;
};

export const toggleProductArchive = async (productId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/toggle-archive`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data.product;
};

export const fetchAllPublicProducts = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/get-all-public-product`,
		{
			credentials: "include",
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to fetch products");
	}

	return data.products;
};

export const fetchProductById = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
		{
			credentials: "include",
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Product not found");
	}

	return data;
};