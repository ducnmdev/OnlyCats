export const fetchDashboardData = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        {
            credentials: "include",
        }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data.data;
};