export const createCheckoutSession = async ({
    productId,
    size,
}: {
    productId: string;
    size: string;
}) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId, size }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};