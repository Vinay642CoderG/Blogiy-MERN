import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          postApi.getPosts({
            status: "published",
            limit: 50, // Increased limit to get more posts for filtering
            sortBy: "createdAt",
            order: "desc",
          }),
          categoryApi.getCategories(),
        ]);

        const postsData = postsResponse.data.data.docs || [];
        const categoriesData = categoriesResponse.data.data || [];

        setPosts(postsData);
        setCategories(categoriesData);
        setFilteredPosts(postsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on search query and selected category
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category?._id === selectedCategory,
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category?.name.toLowerCase().includes(query),
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
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
              <p className="text-gray-600">
                {filteredPosts.length} posts found
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
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
          ) : filteredPosts.length === 0 ? (
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
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
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
