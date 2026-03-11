function BlogTags({ tags }) {
  return (
    <div className="px-8">
      <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BlogTags;
