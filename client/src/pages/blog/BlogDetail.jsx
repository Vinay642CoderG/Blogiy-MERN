import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../components/ui";
import BlogHeader from "./components/BlogHeader";
import BlogContent from "./components/BlogContent";
import BlogTags from "./components/BlogTags";
import BlogActions from "./components/BlogActions";
import CommentSection from "./components/CommentSection";
import { postApi } from "../../api/api";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postApi.getPostById(id);
        setPost(response.data.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        if (err.response?.status === 404) {
          setError("Post not found");
        } else {
          setError("Failed to load post");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error === "Post not found"
              ? "Post Not Found"
              : "Error Loading Post"}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The post you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Transform post data for components
  const blogData = {
    id: post._id,
    title: post.title,
    author: post.author?.name || "Blog Owner",
    date: formatDate(post.createdAt),
    readTime: `${calculateReadTime(post.content)} min read`,
    category: post.category?.name,
    tags: post.tags || [],
    image: post._featuredImage?.url,
    content: post.content,
    views: post.views || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Blog Article */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <BlogHeader blog={blogData} />
          <BlogContent content={blogData.content} />
          <BlogTags tags={blogData.tags} />
          <BlogActions />
        </article>

        {/* Comments Section */}
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}

export default BlogDetail;
