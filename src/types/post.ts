exportexport interface PostItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string | null;
    content?: string;
    thumbnail: string | null;
    author: string | null;
    is_published?: number;
    view_count?: number;
    created_at: string;
    updated_at?: string;
}