export const fetchOrderStatus = async (orderId: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
        {
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch order");
    }

    return data.order;
};