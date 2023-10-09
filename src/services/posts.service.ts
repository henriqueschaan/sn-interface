import { API } from './api';

export async function fetchFeed() {
    try {
        const response = await API.get(`/posts/feed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export async function createPost(data: { picLink: string; description: string }) {
    try {
        const response = await API.post('/posts', data);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export async function updatePost(postId: number, data: { picLink: string; description: string }) {
    try {
        const response = await API.put(`/posts/${postId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export async function deletePost(postId: number) {
    try {
        const response = await API.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}