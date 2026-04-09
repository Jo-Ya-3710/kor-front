import { useEffect, useState } from "react";
import TopBanner from "../components/TopBanner";
import MainNavbar from "../components/MainNavbar";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { fetchPosts } from "../services/postService";
import type { PostItem } from "../types/post";

function HomePage() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    return (
        <div className="homepage">
            <TopBanner />
            <MainNavbar />

            <section className="post-grid-section" id="posts">
                <div className="site-container">
                    {loading ? <Loading /> : null}
                    {!loading && error ? <EmptyState message={error} /> : null}
                    {!loading && !error && posts.length === 0 ? <EmptyState message="No posts found." /> : null}

                    {!loading && !error && posts.length > 0 ? (
                        <div className="post-grid">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default HomePage;