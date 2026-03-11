import { HiHeart, HiShare } from "react-icons/hi";

function BlogActions() {
  return (
    <div className="px-8 pb-8">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors">
          <HiHeart className="h-5 w-5" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
          <HiShare className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default BlogActions;
