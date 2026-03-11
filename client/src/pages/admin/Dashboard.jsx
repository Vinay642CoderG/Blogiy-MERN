import { MdArticle, MdComment, MdPeople, MdTrendingUp } from "react-icons/md";
import Card from "../../components/ui/Card";

const stats = [
  {
    name: "Total Posts",
    value: "124",
    icon: MdArticle,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Total Comments",
    value: "1,234",
    icon: MdComment,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    name: "Total Users",
    value: "456",
    icon: MdPeople,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <Card.Content className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="h-12 w-12 rounded bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Sample Blog Post Title {i}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Recent Comments</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <p className="text-sm text-gray-900">
                    Great article! This really helped me understand...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    by User {i} • 1 hour ago
                  </p>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
