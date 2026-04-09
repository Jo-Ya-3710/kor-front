import { Link } from "react-router-dom";
import type { PostItem } from "../types/post";

interface PostCardProps {
    post: PostItem;
}

function PostCard({ post }: PostCardProps) {
    const thumbnailSrc = post.thumbnail || "https://via.placeholder.com/1200x800?text=No+Image";
    const authorName = post.author || "admin";
    const formattedDate = new Date(post.created_at).toLocaleDateString();

    return (
        <article className="post-card">
            <Link to={`/post/${post.slug}`} className="post-card-image-link">
                <img className="post-card-image" src={thumbnailSrc} alt={post.title} />
            </Link>

            <div className="post-card-content">
                <p className="post-card-category">{post.category}</p>
                <h2 className="post-card-title">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-card-excerpt">{post.excerpt || "No summary available."}</p>

                <div className="post-card-meta">
                    <span>{authorName}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                </div>
            </div>
        </article>
    );
}

export default PostCard;