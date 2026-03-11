import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentSection({ initialComments = [] }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "You",
        content: comment,
        date: "Just now",
        avatar: "YO",
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h2>

      <CommentForm
        comment={comment}
        setComment={setComment}
        onSubmit={handleCommentSubmit}
      />

      <CommentList comments={comments} />
    </div>
  );
}

export default CommentSection;
