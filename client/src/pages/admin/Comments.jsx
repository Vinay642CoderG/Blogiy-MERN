import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  IoEllipsisVertical,
  IoCreate,
  IoTrash,
  IoSearch,
  IoRefresh,
  IoFilter,
  IoTime,
  IoPersonCircle,
  IoDocumentText,
} from "react-icons/io5";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import {
  fetchComments,
  updateComment,
  deleteComment,
  clearError,
  setPage,
} from "../../redux/slices/commentSlice";

function Comments() {
  const dispatch = useDispatch();
  const { comments, totalComments, currentPage, totalPages, loading, error } =
    useSelector((state) => state.comments);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editName, setEditName] = useState("");

  const loadComments = () => {
    const params = {
      page: currentPage,
      limit: 10,
      sortBy,
      order: sortOrder,
      search: searchTerm,
    };
    dispatch(fetchComments(params));
  };

  // Load comments when page, sort changes (without debounce)
  useEffect(() => {
    loadComments();
  }, [currentPage, sortBy, sortOrder]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (searchTerm === "") {
      // If search is cleared, load immediately
      loadComments();
      return;
    }

    const timeoutId = setTimeout(() => {
      // Reset to first page when searching
      if (currentPage !== 1) {
        dispatch(setPage(1));
      } else {
        loadComments();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search will be handled by the useEffect with debouncing
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
    setEditName(comment.name || "");
  };

  const handleSaveEdit = async (commentId) => {
    if (!editContent.trim()) {
      toast.error("Comment content cannot be empty");
      return;
    }

    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      await dispatch(
        updateComment({
          id: commentId,
          commentData: {
            content: editContent.trim(),
            name: editName.trim(),
          },
        }),
      ).unwrap();
      toast.success("Comment updated successfully!");
      setEditingComment(null);
      setEditContent("");
      setEditName("");
      // Reload comments to ensure fresh data
      loadComments();
    } catch (error) {
      toast.error(error || "Failed to update comment");
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
    setEditName("");
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await dispatch(deleteComment(commentId)).unwrap();
        toast.success("Comment deleted successfully!");
        // Reload comments to ensure fresh data
        loadComments();
      } catch (error) {
        toast.error(error || "Failed to delete comment");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  // Show full page loader only on initial load when there are no comments
  const showFullPageLoader =
    loading && comments.length === 0 && !searchTerm && currentPage === 1;

  if (showFullPageLoader) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
          <p className="text-gray-600 mt-1">
            Manage user comments ({totalComments} total)
          </p>
        </div>
        <Button
          onClick={loadComments}
          variant="outline"
          disabled={loading}
          className="self-start sm:self-auto"
        >
          <IoRefresh className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading}>
            <IoSearch className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </Card>

      {/* Comments Table */}
      <Card>
        <div className="relative">
          {/* Loading Overlay */}
          {loading && comments.length > 0 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border">
                <Loader size="sm" />
                <span className="text-sm text-gray-600">Refreshing...</span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("author")}
                  >
                    <div className="flex items-center gap-2">
                      <IoPersonCircle className="h-4 w-4" />
                      Author {getSortIcon("author")}
                    </div>
                  </Table.Head>
                  <Table.Head className="min-w-[300px]">
                    <div className="flex items-center gap-2">
                      <IoDocumentText className="h-4 w-4" />
                      Comment
                    </div>
                  </Table.Head>
                  <Table.Head
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("post")}
                  >
                    Post {getSortIcon("post")}
                  </Table.Head>
                  <Table.Head
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-2">
                      <IoTime className="h-4 w-4" />
                      Date {getSortIcon("createdAt")}
                    </div>
                  </Table.Head>
                  <Table.Head className="text-right">Actions</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {comments.length === 0 && !loading ? (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <IoDocumentText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No comments found</p>
                        <p className="text-sm">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Comments will appear here when users post them"}
                        </p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ) : comments.length === 0 && loading ? (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <Loader size="md" />
                        <span className="ml-2 text-gray-600">
                          Loading comments...
                        </span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  comments.map((comment) => (
                    <Table.Row key={comment._id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <IoPersonCircle className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {comment.name || "Anonymous User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Anonymous User
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {editingComment === comment._id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                  placeholder="Name"
                                  maxLength={100}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Comment Content
                              </label>
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                rows={3}
                                maxLength={1000}
                                placeholder="Comment content"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(comment._id)}
                                disabled={loading}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-gray-900 leading-relaxed">
                              {comment.content}
                            </p>
                            {comment.isEdited && (
                              <Badge variant="secondary" size="sm">
                                Edited
                              </Badge>
                            )}
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900 truncate">
                            {comment.post?.title || "Unknown Post"}
                          </p>
                          {comment.post?.slug && (
                            <p className="text-xs text-gray-500">
                              /{comment.post.slug}
                            </p>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-gray-500">
                        {formatDate(comment.createdAt)}
                      </Table.Cell>
                      <Table.Cell className="text-right">
                        <Dropdown>
                          <Dropdown.Trigger>
                            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                              <IoEllipsisVertical className="h-5 w-5 text-gray-600" />
                            </button>
                          </Dropdown.Trigger>
                          <Dropdown.Content>
                            <Dropdown.Item
                              onClick={() => handleEditComment(comment)}
                              disabled={editingComment === comment._id}
                            >
                              <IoCreate className="h-4 w-4" />
                              Edit Comment
                            </Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-red-600"
                            >
                              <IoTrash className="h-4 w-4" />
                              Delete Comment
                            </Dropdown.Item>
                          </Dropdown.Content>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, totalComments)} of {totalComments}{" "}
              comments
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(setPage(currentPage - 1))}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(setPage(currentPage + 1))}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Comments;
