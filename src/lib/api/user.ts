export const fetchUserProfile = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
		{
			credentials: "include",
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to fetch profile");
	}

	return data.user;
};

export const updateUserProfile = async ({
	name,
	image,
}: {
	name: string;
	image: string;
}) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
		{
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, image }),
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to update profile");
	}

	return data.user;
};

export const fetchAdminProfile = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/admin`
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to fetch admin profile");
	}

	return data.admin;
};