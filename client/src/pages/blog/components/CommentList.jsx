function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((commentItem) => (
        <div
          key={commentItem.id}
          className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {commentItem.avatar}
            </div>
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">
                {commentItem.author}
              </span>
              <span className="text-sm text-gray-500">{commentItem.date}</span>
            </div>
            <p className="text-gray-700">{commentItem.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
