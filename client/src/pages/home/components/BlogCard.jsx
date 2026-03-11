import { Link } from "react-router-dom";

function BlogCard({ id, title, description, category, date, readTime, image }) {
  return (
    <Link to={`/blog/${id}`}>
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 bg-linear-to-br from-blue-400 to-purple-500 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500"></div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          {category && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{date}</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BlogCard;
