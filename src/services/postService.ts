import type { PostItem } from "../types/post";

const API_BASE_URL = "http://localhost:4000/api";

export async function fetchPosts(): Promise<PostItem[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function fetchPostBySlug(slug: string): Promise<PostItem> {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`);

    if (!response.ok) {
        throw new Error("Failed to fetch post detail");
    }

    return response.json();
}