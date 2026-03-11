import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { createComment } from "../../../redux/slices/commentSlice";
import { commentApi } from "../../../api/api";

function CommentSection({ postId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load comments for the post
  useEffect(() => {
    if (postId) {
      loadComments();
    }
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await commentApi.getPostComments(postId);
      setComments(response.data.data.docs || []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        createComment({
          content: comment.trim(),
          postId,
          name: name.trim(),
        }),
      ).unwrap();

      toast.success("Comment posted successfully!");
      setComment("");
      setName("");

      // Reload comments to show the new one
      await loadComments();
    } catch (error) {
      toast.error(error || "Failed to post comment");
    } finally {
      setLoading(false);
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
        name={name}
        setName={setName}
        onSubmit={handleCommentSubmit}
        loading={loading}
      />

      <CommentList comments={comments} />
    </div>
  );
}

export default CommentSection;
