export const fetchMe = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
            credentials: "include",
        }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
};

export const login = async (payload: {
    email: string;
    password: string;
}) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message || "Login failed",
            status: res.status,
        };
    }

    return data;
};

export const logout = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }

    return res.json();
};

export const signup = async (payload: {
    name: string
    email: string
    password: string
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Failed to create account.")
    }

    return data
}

export const forgotPassword = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error("Something went wrong. Please try again.")
  }

  return data
}

export const resetPassword = async (params: {
  token: string
  password: string
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${params.token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        password: params.password,
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Invalid or expired reset link.")
  }

  return data
}

export const verifyEmail = async (code: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ code }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Invalid verification code.");
    }

    return data;
};