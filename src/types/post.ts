export interface User {
    id: string
    email: string
    name: string
    image?: string | null
    isSubscribed: boolean
    customerId: string | null
    isVerified: boolean
    createdAt: string
    lastLogin: string
}

export interface Comment {
    id: string
    text: string
    userId: string
    postId: string
    createdAt: string
    user: User
}

export interface Like {
    id: string
    userId: string
    postId: string
}

export interface PostType {
    id: string
    mediaUrl: string | null
    mediaType: string | null
    text: string
    userId: string
    likes: number
    isPublic: boolean
    createdAt: string
    updatedAt: string
    comments: Comment[]
    likesList: Like[]
}