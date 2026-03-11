import { HiClock, HiUser, HiTag } from "react-icons/hi";

function BlogHeader({ blog }) {
  return (
    <div>
      {/* Featured Image */}
      <div className="w-full h-96 bg-gray-200">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="p-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <HiTag className="mr-1 h-4 w-4" />
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <HiUser className="mr-2 h-5 w-5" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <HiClock className="mr-2 h-5 w-5" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center">
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
