export interface User {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    username: string;
    description: string;
    email: string;
    phone: string;
    picLink: string;
    password: string;
}

export interface UserProfile {
    user: {
        id: number;
        picLink: string;
        name: string;
        description: string;
        postCount: number;
        friendCount: number;
        isFriend: boolean;
    }
    posts: { picLink: string; id: number; description: string }[];
}