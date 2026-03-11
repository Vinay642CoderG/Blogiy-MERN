import { useState } from "react";
import {
  IoAdd,
  IoEllipsisVertical,
  IoCreate,
  IoTrash,
  IoSparkles,
} from "react-icons/io5";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";
import PostFormDialog from "./components/PostFormDialog";

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    slug: "getting-started-react",
    status: "published",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "Advanced TypeScript Tips",
    slug: "advanced-typescript-tips",
    status: "draft",
    date: "2024-03-09",
  },
  {
    id: 3,
    title: "Building REST APIs",
    slug: "building-rest-apis",
    status: "published",
    date: "2024-03-08",
  },
];

function Posts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <Button onClick={handleCreate}>
          <IoAdd className="h-5 w-5 mr-2" />
          Create Post
        </Button>
      </div>

      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Title</Table.Head>
              <Table.Head>Slug</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Date</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockPosts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell className="font-medium">{post.title}</Table.Cell>
                <Table.Cell className="text-gray-500">{post.slug}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      post.status === "published" ? "success" : "warning"
                    }
                  >
                    {post.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-gray-500">{post.date}</Table.Cell>
                <Table.Cell className="text-right">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <IoEllipsisVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <Dropdown.Item onClick={() => handleEdit(post)}>
                        <IoCreate className="h-4 w-4" />
                        Edit
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

      <PostFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        post={editingPost}
      />
    </div>
  );
}

export default Posts;
