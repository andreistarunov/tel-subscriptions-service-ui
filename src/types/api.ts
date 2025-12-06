export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserRequest {
    name: string;
    login: string;
    password: string;
}

export interface AuthUserRequest {
    username: string;
    password: string;
    grant_type: string;
    scope: string;
}

export interface AuthUserResponse {
    access_token: string;
    token_type: string;
}

export interface Subscription {
    id: string
    title: string
    description: string
    price: number
    days: number
    seller_id: string
}

export interface CreateSubscriptionRequest {
    title: string;
    description: string;
    price: number;
    days: number;
    seller_id: string;
}

export interface RemoveSubscriptionRequest {
    id: string
}