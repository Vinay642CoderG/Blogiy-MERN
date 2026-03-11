import {
  IoEllipsisVertical,
  IoCreate,
  IoTrash,
  IoShield,
} from "react-icons/io5";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    joined: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    joined: "2024-03-01",
  },
];

function Users() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-1">Manage user accounts</p>
      </div>

      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Joined</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell className="font-medium">{user.name}</Table.Cell>
                <Table.Cell className="text-gray-500">{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge variant={user.role === "admin" ? "info" : "default"}>
                    {user.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={user.status === "active" ? "success" : "default"}
                  >
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-gray-500">{user.joined}</Table.Cell>
                <Table.Cell className="text-right">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <IoEllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Item>
                        <IoCreate className="h-4 w-4" />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <IoShield className="h-4 w-4" />
                        Change Role
                      </Dropdown.Item>
                      <Dropdown.Separator />
                      <Dropdown.Item className="text-red-600">
                        <IoTrash className="h-4 w-4" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}

export default Users;
