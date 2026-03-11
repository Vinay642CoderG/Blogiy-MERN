import { Button, Input } from "../../../components/ui";

function CommentForm({
  comment,
  setComment,
  name,
  setName,
  onSubmit,
  loading,
}) {
  return (
    <form onSubmit={onSubmit} className="mb-8 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Input
          type="text"
          placeholder="Your name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="h-12"
        />
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        rows="4"
        maxLength={1000}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        required
      />

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {comment.length}/1000 characters
        </p>
        <Button
          type="submit"
          disabled={!comment.trim() || !name.trim() || loading}
          isLoading={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}

export default CommentForm;
