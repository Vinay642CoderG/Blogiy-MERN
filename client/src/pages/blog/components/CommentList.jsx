import { IoPersonCircle } from "react-icons/io5";

function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      {comments.map((commentItem) => (
        <div
          key={commentItem._id}
          className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0"
        >
          {/* Avatar */}
          <div className="shrink-0">
            {commentItem.author?._profileImage?.url ? (
              <img
                src={commentItem.author._profileImage.url}
                alt={commentItem.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {commentItem.name ? (
                  getInitials(commentItem.name)
                ) : (
                  <IoPersonCircle className="h-6 w-6" />
                )}
              </div>
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 truncate">
                {commentItem.name || "Anonymous"}
              </span>
              {commentItem.author && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Registered
                </span>
              )}
              <span className="text-sm text-gray-500">
                {formatDate(commentItem.createdAt)}
              </span>
              {commentItem.isEdited && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {commentItem.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
