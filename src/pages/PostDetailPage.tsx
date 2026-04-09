import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import {fetchPostBySlug} from "../services/postService";
import type {PostItem} from "../types/post";

function PostDetailPage() {
    const {slug} = useParams<{ slug: string }>();
    const [post, setPost] = useState<PostItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!slug) {
            setError("Invalid post slug.");
            setLoading(false);
            return;
        }

        const loadPost = async () => {
            try {
                const data = await fetchPostBySlug(slug);
                setPost(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load post detail.");
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    return (
        <div className="post-detail-page">
            <MainNavbar/>

            <section className="post-detail-section">
                <div className="site-container narrow">
                    {loading ? <Loading/> : null}
                    {!loading && error ? <EmptyState message={error}/> : null}

                    {!loading && !error && post ? (
                        <article className="post-detail-article">
                            <Link to="/" className="back-link">← Back to Home</Link>

                            <p className="post-detail-category">{post.category}</p>
                            <h1 className="post-detail-title">{post.title}</h1>

                            <div className="post-detail-meta">
                                <span>{post.author || "admin"}</span>
                                <span>•</span>
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                {typeof post.view_count === "number" ? (
                                    <>
                                        <span>•</span>
                                        <span>Views {post.view_count}</span>
                                    </>
                                ) : null}
                            </div>

                            {post.thumbnail ? (
                                <img className="post-detail-image" src={post.thumbnail} alt={post.title}/>
                            ) : null}

                            {post.excerpt ? <p className="post-detail-excerpt">{post.excerpt}</p> : null}

                            <div
                                className="post-detail-content"
                                dangerouslySetInnerHTML={{__html: post.content || ""}}
                            />
                        </article>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default PostDetailPage;