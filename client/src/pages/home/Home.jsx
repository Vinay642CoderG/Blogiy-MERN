import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@radix-ui/themes";
import { Button, Loader } from "../../components/ui";
import HeroSection from "./components/HeroSection";
import BlogCard from "./components/BlogCard";
import Newsletter from "./components/Newsletter";
import CategoryPills from "./components/CategoryPills";
import { postApi, categoryApi } from "../../api/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Initial data fetch - only categories and initial posts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          postApi.getPosts({
            status: "published",
            limit: 12,
            sortBy: "createdAt",
            order: "desc",
          }),
          categoryApi.getCategories(),
        ]);

        const postsData = postsResponse.data.data.docs || [];
        const categoriesData = categoriesResponse.data.data || [];

        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch posts based on search and category filters
  const fetchFilteredPosts = useCallback(async (search = "", category = "") => {
    try {
      setPostsLoading(true);
      const params = {
        status: "published",
        limit: 50,
        sortBy: "createdAt",
        order: "desc",
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (category) {
        params.category = category;
      }

      const response = await postApi.getPosts(params);
      const postsData = response.data.data.docs || [];
      setPosts(postsData);
    } catch (err) {
      console.error("Failed to fetch filtered posts:", err);
      setError("Failed to load posts");
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    if (!searchQuery && !selectedCategory) {
      // If no filters, fetch initial posts
      fetchFilteredPosts();
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchFilteredPosts(searchQuery, selectedCategory);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, fetchFilteredPosts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

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

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-white">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />

      {/* Categories Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600">Find posts that interest you most</p>
          </div>

          {categories.length > 0 && (
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              loading={postsLoading}
            />
          )}
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          {/* Search/Filter Results Header */}
          {(searchQuery || selectedCategory) && (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery && selectedCategory
                  ? `Search results for "${searchQuery}" in ${categories.find((c) => c._id === selectedCategory)?.name}`
                  : searchQuery
                    ? `Search results for "${searchQuery}"`
                    : `Posts in ${categories.find((c) => c._id === selectedCategory)?.name}`}
              </h3>
              <p className="text-gray-600">{posts.length} posts found</p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={handleClearFilters}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {/* Posts Loading State */}
              {postsLoading && (
                <div className="flex justify-center items-center py-8 mb-8">
                  <Spinner size="3" />
                  <span className="ml-3 text-gray-600">Loading posts...</span>
                </div>
              )}

              {/* Posts Content */}
              {!postsLoading && posts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-600 mb-4">
                    {searchQuery || selectedCategory
                      ? "No posts found matching your criteria."
                      : "No posts available yet."}
                  </p>
                  <p className="text-sm text-gray-500">
                    {searchQuery || selectedCategory
                      ? "Try adjusting your search or category filter."
                      : "Check back later for new content!"}
                  </p>
                </div>
              ) : (
                !postsLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                      <BlogCard
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        description={post.excerpt}
                        category={post.category?.name}
                        date={formatDate(post.createdAt)}
                        readTime={calculateReadTime(post.content)}
                        image={post._featuredImage?.url}
                      />
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}

export default Home;
