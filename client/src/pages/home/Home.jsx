import { Link } from "react-router-dom";
import { Button } from "../../components/ui";
import HeroSection from "./components/HeroSection";
import BlogCard from "./components/BlogCard";
import Newsletter from "./components/Newsletter";

function Home() {
  // Sample blog data
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      description:
        "Learn the fundamentals of React and build your first component-based application.",
      category: "Technology",
      date: "March 1, 2026",
      readTime: 5,
    },
    {
      id: 2,
      title: "Modern UI Design Principles",
      description:
        "Explore the latest trends in user interface design and create stunning experiences.",
      category: "Design",
      date: "March 2, 2026",
      readTime: 7,
    },
    {
      id: 3,
      title: "Building Scalable APIs",
      description:
        "Best practices for designing and implementing RESTful APIs that scale.",
      category: "Development",
      date: "March 3, 2026",
      readTime: 10,
    },
    {
      id: 4,
      title: "The Art of Minimalism",
      description:
        "Discover how minimalist living can transform your daily routine and mindset.",
      category: "Lifestyle",
      date: "March 4, 2026",
      readTime: 4,
    },
    {
      id: 5,
      title: "TypeScript Best Practices",
      description:
        "Level up your TypeScript skills with these advanced tips and techniques.",
      category: "Technology",
      date: "March 5, 2026",
      readTime: 8,
    },
    {
      id: 6,
      title: "Color Theory for Developers",
      description:
        "Understanding color psychology and how to apply it in your designs.",
      category: "Design",
      date: "March 6, 2026",
      readTime: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Posts Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}

export default Home;
