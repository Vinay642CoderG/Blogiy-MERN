import { useState } from "react";
import { HiSearch, HiSparkles } from "react-icons/hi";
import { Button } from "../../../components/ui";
import CategoryPills from "./CategoryPills";

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Design",
    "Development",
    "Lifestyle",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <HiSparkles className="h-4 w-4 animate-pulse" />
            New: AI feature integrated
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center mb-6 animate-fade-in-up">
          <span className="bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            My personal blog
          </span>
          <br />
          <span className="text-gray-900">space.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-700 text-center max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
          Welcome to my corner of the internet where I share thoughts, ideas,
          and stories. Explore my posts, leave comments, and join the
          conversation.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-400"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for posts..."
                className="w-full px-6 py-5 pr-36 text-gray-900 bg-white border-2 border-transparent rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <HiSearch className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Category Pills */}
        <div className="animate-fade-in-up animation-delay-600">
          <CategoryPills
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
