function CategoryPills({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
