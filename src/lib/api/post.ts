export const createPost = async (postData: {
	text: string;
	mediaUrl?: string;
	mediaType?: "image" | "video";
	isPublic: boolean;
}) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/create-post`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(postData),
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to create post");
	}

	return data;
};

export const fetchPostStats = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/stats`,
		{
			credentials: "include",
		}
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to fetch stats");
	}

	return data.stats;
};

export const fetchPosts = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/get-posts`, {
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch posts");
	}

	return res.json();
};

export const deletePost = async (postId: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (!res.ok) {
		throw new Error("Delete failed");
	}

	return res.json();
};

export const likePost = async (postId: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/like`,
		{
			method: "POST",
			credentials: "include",
		}
	);

	if (!res.ok) {
		throw new Error("Like failed");
	}

	return res.json();
};

type CommentInput = {
	postId: string;
	text: string;
};

export const commentPost = async ({ postId, text }: CommentInput) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
			credentials: "include",
		}
	);

	if (!res.ok) {
		throw new Error("Comment failed");
	}

	return res.json();
};