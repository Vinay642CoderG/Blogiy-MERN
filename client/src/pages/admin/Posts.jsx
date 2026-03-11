import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoAdd,
  IoEllipsisVertical,
  IoCreate,
  IoTrash,
  IoSearch,
  IoChevronBack,
  IoChevronForward,
  IoFolderOpen,
  IoRefresh,
} from "react-icons/io5";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";
import Input from "../../components/ui/Input";
import Dialog from "../../components/ui/Dialog";
import PostFormDialog from "./components/PostFormDialog";
import CategoryManageDialog from "./components/CategoryManageDialog";
import {
  fetchPosts,
  deletePost,
  setFilters,
  clearError,
} from "../../redux/slices/postSlice";
import { toast } from "react-hot-toast";

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, error, pagination, filters } = useSelector(
    (state) => state.posts,
  );

  const [postFormOpen, setPostFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "");
  const [categoryManageOpen, setCategoryManageOpen] = useState(false);

  // Debounced search function
  const debounceSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchValue) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          dispatch(setFilters({ search: searchValue, page: 1 }));
        }, 500); // 500ms delay
      };
    })(),
    [dispatch],
  );

  // Load posts on component mount and when filters change
  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      sortBy: filters.sortBy,
      order: filters.order,
    };

    // Only include search if it has a value
    if (filters.search) {
      params.search = filters.search;
    }

    // Only include status if it has a value (not empty string)
    if (filters.status) {
      params.status = filters.status;
    }

    dispatch(fetchPosts(params));
  }, [dispatch, filters, pagination.page, pagination.limit]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounceSearch(value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    dispatch(setFilters({ status, page: 1 }));
  };

  const handleSort = (sortBy) => {
    const newOrder =
      filters.sortBy === sortBy && filters.order === "desc" ? "asc" : "desc";
    dispatch(setFilters({ sortBy, order: newOrder }));
  };

  const handlePageChange = (newPage) => {
    dispatch(setFilters({ page: newPage }));
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setPostFormOpen(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setPostFormOpen(true);
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await dispatch(deletePost(postToDelete._id)).unwrap();
      toast.success("Post deleted successfully!");
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      toast.error(error || "Failed to delete post");
    }
  };

  const handleRefresh = () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      sortBy: filters.sortBy,
      order: filters.order,
    };

    // Only include search if it has a value
    if (filters.search) {
      params.search = filters.search;
    }

    // Only include status if it has a value (not empty string)
    if (filters.status) {
      params.status = filters.status;
    }

    dispatch(fetchPosts(params));
    toast.success("Posts refreshed!");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "archived":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <IoRefresh
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => setCategoryManageOpen(true)}
            className="w-full sm:w-auto"
          >
            <IoFolderOpen className="h-4 w-4 mr-2" />
            Manage Categories
          </Button>
          <Button onClick={handleCreatePost} className="w-full sm:w-auto">
            <IoAdd className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <Card.Content className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts by title or content..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Posts Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head
                  className="cursor-pointer hover:bg-gray-50 min-w-[200px]"
                  onClick={() => handleSort("title")}
                >
                  Title
                  {filters.sortBy === "title" && (
                    <span className="ml-1">
                      {filters.order === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </Table.Head>
                <Table.Head className="min-w-[100px]">Status</Table.Head>
                <Table.Head className="min-w-[120px]">Author</Table.Head>
                <Table.Head
                  className="cursor-pointer hover:bg-gray-50 min-w-[120px]"
                  onClick={() => handleSort("createdAt")}
                >
                  Created
                  {filters.sortBy === "createdAt" && (
                    <span className="ml-1">
                      {filters.order === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </Table.Head>
                <Table.Head className="text-right min-w-[80px]">
                  Actions
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading posts...</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : posts.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No posts found
                  </Table.Cell>
                </Table.Row>
              ) : (
                posts.map((post) => (
                  <Table.Row key={post._id}>
                    <Table.Cell>
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {post.slug}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={getStatusBadgeVariant(post.status)}>
                        {post.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="text-gray-500">
                      {post.author?.name || "Unknown"}
                    </Table.Cell>
                    <Table.Cell className="text-gray-500">
                      {formatDate(post.createdAt)}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <Dropdown>
                        <Dropdown.Trigger>
                          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                            <IoEllipsisVertical className="h-5 w-5 text-gray-600" />
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                          <Dropdown.Item onClick={() => handleEditPost(post)}>
                            <IoCreate className="h-4 w-4" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Separator />
                          <Dropdown.Item
                            onClick={() => handleDeleteClick(post)}
                            className="text-red-600"
                          >
                            <IoTrash className="h-4 w-4" />
                            Delete
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 text-center sm:text-left">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalDocs,
              )}{" "}
              of {pagination.totalDocs} posts
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrevPage}
                className="flex items-center"
              >
                <IoChevronBack className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>
              <span className="text-sm text-gray-500 px-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
                className="flex items-center"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <IoChevronForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Post Form Dialog */}
      <PostFormDialog
        open={postFormOpen}
        onClose={() => setPostFormOpen(false)}
        post={selectedPost}
      />

      {/* Category Management Dialog */}
      <CategoryManageDialog
        open={categoryManageOpen}
        onClose={() => setCategoryManageOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <Dialog.Content className="max-w-md">
          <Dialog.Title>Delete Post</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete "{postToDelete?.title}"? This action
            cannot be undone.
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              isLoading={loading}
            >
              Delete Post
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default Posts;
