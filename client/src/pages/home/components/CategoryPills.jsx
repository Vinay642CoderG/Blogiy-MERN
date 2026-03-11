function CategoryPills({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* All Categories Button */}
      <button
        onClick={() => onCategoryChange("")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !selectedCategory
            ? "bg-blue-600 text-white shadow-md"
            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        }`}
      >
        All Categories
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryChange(category._id)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category._id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
