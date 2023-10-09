import { API } from './api';

export async function fetchProfile(username: string, userId: string | null) {
    try {
        const response = await API.get(`/users/${username}?loggedInUserId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export async function fetchFriends(userId: number) {
    try {
        const response = await API.get(`/users/${userId}/friends`);
        return response.data;
    } catch (error) {
        console.error('Error fetching friends:', error);
        throw error;
    }
}