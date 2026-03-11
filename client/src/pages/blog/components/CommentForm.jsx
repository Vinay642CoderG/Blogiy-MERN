import { Button } from "../../../components/ui";

function CommentForm({ comment, setComment, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        rows="4"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
      <div className="mt-3 flex justify-end">
        <Button type="submit" disabled={!comment.trim()}>
          Post Comment
        </Button>
      </div>
    </form>
  );
}

export default CommentForm;
