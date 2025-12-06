import type { User, CreateUserRequest, Subscription, AuthUserResponse, CreateSubscriptionRequest, AuthUserRequest } from '@/types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

export class ApiService {
    static async getSubscriptionsByUser(userId: string): Promise<Subscription[]> {
        const response = await fetch(`${API_BASE_URL}/subscriptions/${userId}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw Error('Failed to fetch subscriptions');
        }

        return response.json();
    }

    static async createSubscription(subcriptionData: CreateSubscriptionRequest) {
        const response = await fetch(`${API_BASE_URL}/subscriptions/`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(subcriptionData)
        })

        if (!response.ok) {
            throw Error('Failed to fetch subscriptions');
        }

        return response.json();
    }

    static async registerUser(userData: CreateUserRequest) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(userData)
        });

        if (!response.ok) {
            throw Error('Failed to register user')
        }

        return response.json()
    }

    static async authUser(authData: AuthUserRequest): Promise<AuthUserResponse> {
        const params = new URLSearchParams();
        params.append('grant_type', authData.grant_type);
        params.append('username', authData.username);
        params.append('password', authData.password);
        params.append('scope', authData.scope);

        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: 'POST',
            body: params,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        if (!response.ok) {
            throw Error('Failed to auth user')
        }

        return response.json()
    }
}