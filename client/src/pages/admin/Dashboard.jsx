import { useEffect, useState } from "react";
import { MdArticle, MdComment, MdDrafts } from "react-icons/md";
import { IoRefresh } from "react-icons/io5";
import Card from "@/components/ui/Card";
import { Loader, Button } from "@/components/ui";
import { dashboardApi } from "@/api/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return formatDate(dateString);
  };

  // Show full page loader only on initial load when there's no data
  const showFullPageLoader = loading && !stats;

  if (showFullPageLoader) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchDashboardStats} className="mr-2">
          Try Again
        </Button>
      </div>
    );
  }

  const statsData = [
    {
      name: "Total Posts",
      value: stats?.totalPosts || 0,
      icon: MdArticle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Published Posts",
      value: stats?.publishedPosts || 0,
      icon: MdArticle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      name: "Draft Posts",
      value: stats?.draftPosts || 0,
      icon: MdDrafts,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      name: "Total Comments",
      value: stats?.totalComments || 0,
      icon: MdComment,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening.
          </p>
        </div>
        <Button
          onClick={fetchDashboardStats}
          variant="outline"
          disabled={loading}
          className="self-start sm:self-auto"
        >
          <IoRefresh className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Main Content with Single Loading Overlay */}
      <div className="relative space-y-6">
        {/* Single Loading Overlay for All Content */}
        {loading && stats && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border">
              <Loader size="sm" />
              <span className="text-sm text-gray-600">
                Refreshing dashboard...
              </span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <Card key={stat.name}>
              <Card.Content className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>Recent Posts</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {stats?.recentPosts?.length > 0 ? (
                  stats.recentPosts.map((post) => (
                    <div
                      key={post._id}
                      className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="h-12 w-12 rounded bg-gray-200 shrink-0 overflow-hidden">
                        {post._featuredImage?.url ? (
                          <img
                            src={post._featuredImage.url}
                            alt={post.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <MdArticle className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                          <p className="text-xs text-gray-500">
                            {formatTimeAgo(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent posts</p>
                )}
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Recent Comments</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {stats?.recentComments?.length > 0 ? (
                  stats.recentComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <p className="text-sm text-gray-900 line-clamp-2">
                        {comment.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          by {comment.name} on "{comment.post?.title}"
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent comments</p>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
