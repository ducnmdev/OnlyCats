export interface adminI {
    id: string;
    email: string;
    name: string;
    image?: string;
    isSubscribed: boolean;
    customerId: string | null;
    isVerified: boolean;
    createdAt: Date;
    lastLogin: Date;
}