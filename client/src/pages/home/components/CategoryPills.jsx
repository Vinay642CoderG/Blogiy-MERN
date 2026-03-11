import { Spinner } from "@radix-ui/themes";

function CategoryPills({
  categories,
  selectedCategory,
  onCategoryChange,
  loading = false,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* All Categories Button */}
      <button
        onClick={() => onCategoryChange("")}
        disabled={loading}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !selectedCategory
            ? "bg-blue-600 text-white shadow-md"
            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading && !selectedCategory ? (
          <div className="flex items-center">
            <Spinner size="1" className="mr-2" />
            All Categories
          </div>
        ) : (
          "All Categories"
        )}
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryChange(category._id)}
          disabled={loading}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category._id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading && selectedCategory === category._id ? (
            <div className="flex items-center">
              <Spinner size="1" className="mr-2" />
              {category.name}
            </div>
          ) : (
            category.name
          )}
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
