import {
  IoEllipsisVertical,
  IoCreate,
  IoTrash,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";

const mockComments = [
  {
    id: 1,
    author: "John Doe",
    content: "Great article! Very helpful.",
    post: "Getting Started with React",
    status: "approved",
    date: "2024-03-10",
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "Thanks for sharing this.",
    post: "Advanced TypeScript Tips",
    status: "pending",
    date: "2024-03-09",
  },
  {
    id: 3,
    author: "Bob Johnson",
    content: "Could you elaborate more on...",
    post: "Building REST APIs",
    status: "approved",
    date: "2024-03-08",
  },
];

function Comments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
        <p className="text-gray-600 mt-1">Manage user comments</p>
      </div>

      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Author</Table.Head>
              <Table.Head>Comment</Table.Head>
              <Table.Head>Post</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Date</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockComments.map((comment) => (
              <Table.Row key={comment.id}>
                <Table.Cell className="font-medium">
                  {comment.author}
                </Table.Cell>
                <Table.Cell className="max-w-xs truncate">
                  {comment.content}
                </Table.Cell>
                <Table.Cell className="text-gray-500">
                  {comment.post}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      comment.status === "approved" ? "success" : "warning"
                    }
                  >
                    {comment.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-gray-500">
                  {comment.date}
                </Table.Cell>
                <Table.Cell className="text-right">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <IoEllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {comment.status === "pending" && (
                        <>
                          <Dropdown.Item>
                            <IoCheckmark className="h-4 w-4" />
                            Approve
                          </Dropdown.Item>
                          <Dropdown.Item className="text-red-600">
                            <IoClose className="h-4 w-4" />
                            Reject
                          </Dropdown.Item>
                          <Dropdown.Separator />
                        </>
                      )}
                      <Dropdown.Item>
                        <IoCreate className="h-4 w-4" />
                        Edit
                      </Dropdown.Item>
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

export default Comments;
