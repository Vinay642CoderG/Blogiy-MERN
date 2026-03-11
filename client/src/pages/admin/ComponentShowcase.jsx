import { useState } from "react";
import { IoAdd, IoTrash, IoCreate } from "react-icons/io5";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Dialog from "../../components/ui/Dialog";
import Dropdown from "../../components/ui/Dropdown";
import Table from "../../components/ui/Table";

/**
 * Component Showcase - Demo page showing all UI components
 * This page is for development/documentation purposes
 * You can remove it in production or use it as a style guide
 */
function ComponentShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Component Showcase</h1>
        <p className="text-gray-600 mt-1">
          Preview of all available UI components
        </p>
      </div>

      {/* Buttons */}
      <Card>
        <Card.Header>
          <Card.Title>Buttons</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
            <Button isLoading>Loading...</Button>
            <Button disabled>Disabled</Button>
            <Button>
              <IoAdd className="h-5 w-5 mr-2" />
              With Icon
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Badges */}
      <Card>
        <Card.Header>
          <Card.Title>Badges</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Card.Content>
      </Card>

      {/* Form Inputs */}
      <Card>
        <Card.Header>
          <Card.Title>Form Inputs</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Input
            </label>
            <Input placeholder="Enter text..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Textarea
            </label>
            <Textarea placeholder="Enter long text..." rows={4} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </Card.Content>
      </Card>

      {/* Table */}
      <Card>
        <Card.Header>
          <Card.Title>Table</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="font-medium">Item 1</Table.Cell>
                <Table.Cell>
                  <Badge variant="success">Active</Badge>
                </Table.Cell>
                <Table.Cell className="text-gray-500">2024-03-10</Table.Cell>
                <Table.Cell className="text-right">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button className="p-2 hover:bg-gray-100 rounded-md">
                        •••
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
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
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>

      {/* Dialog */}
      <Card>
        <Card.Header>
          <Card.Title>Dialog (Modal)</Card.Title>
        </Card.Header>
        <Card.Content>
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>
                  This is a description of what this dialog does.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <p className="text-sm text-gray-600">
                  Dialog content goes here. You can add forms, text, or any
                  other content.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </Card.Content>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Card 1</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600">Card content goes here.</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Card 2</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600">Card content goes here.</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Card 3</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-gray-600">Card content goes here.</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default ComponentShowcase;
