import type { PostItem } from "../types/post";
import {config} from "../config";

const apiHost = config.apiHost;
export async function fetchPosts(): Promise<PostItem[]> {
    const response = await fetch(`${apiHost}/posts`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function fetchPostBySlug(slug: string): Promise<PostItem> {
    const response = await fetch(`${apiHost}/posts/${slug}`);

    if (!response.ok) {
        throw new Error("Failed to fetch post detail");
    }

    return response.json();
}