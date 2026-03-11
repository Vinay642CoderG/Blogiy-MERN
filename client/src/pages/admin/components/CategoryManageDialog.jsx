import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoAdd, IoCreate, IoTrash, IoFolderOpen } from "react-icons/io5";
import {
  Dialog,
  Button,
  Input,
  FormField,
  Table,
  Badge,
} from "@/components/ui";
import { categoryApi } from "@/api/api";

function CategoryManageDialog({ open, onClose }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // Fetch categories when dialog opens
  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  // Set form values when editing
  useEffect(() => {
    if (editingCategory) {
      setValue("name", editingCategory.name);
    } else {
      reset();
    }
  }, [editingCategory, setValue, reset]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await categoryApi.updateCategory(editingCategory._id, data);
        toast.success("Category updated successfully!");
      } else {
        await categoryApi.createCategory(data);
        toast.success("Category created successfully!");
      }

      reset();
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${editingCategory ? "update" : "create"} category`,
      );
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await categoryApi.deleteCategory(categoryToDelete._id);
      toast.success("Category deleted successfully!");
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const handleClose = () => {
    onClose();
    setEditingCategory(null);
    reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <Dialog.Content className="w-full max-w-2xl mx-2 sm:mx-4 h-[90vh] max-h-[90vh] overflow-hidden flex flex-col">
          <Dialog.Title className="sr-only">Manage Categories</Dialog.Title>

          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
            <div className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600">
              <IoFolderOpen className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                Manage Categories
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Create, edit, and organize your blog categories
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6">
            {/* Category Form */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <FormField
                      label="Category Name"
                      error={errors.name?.message}
                      required
                    >
                      <Input
                        placeholder="Enter category name"
                        {...register("name", {
                          required: "Category name is required",
                          minLength: {
                            value: 2,
                            message:
                              "Category name must be at least 2 characters",
                          },
                          maxLength: {
                            value: 50,
                            message:
                              "Category name must not exceed 50 characters",
                          },
                        })}
                      />
                    </FormField>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
                    <Button
                      type="submit"
                      className="whitespace-nowrap w-full sm:w-auto"
                    >
                      <IoAdd className="h-4 w-4 mr-2" />
                      {editingCategory ? "Update" : "Add"}
                    </Button>
                    {editingCategory && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Categories List */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Existing Categories ({categories.length})
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading categories...</span>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <IoFolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No categories found</p>
                  <p className="text-sm">Create your first category above</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head>Name</Table.Head>
                        <Table.Head>Slug</Table.Head>
                        <Table.Head className="text-right">Actions</Table.Head>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {categories.map((category) => (
                        <Table.Row key={category._id}>
                          <Table.Cell>
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-gray-900">
                                {category.name}
                              </div>
                              {editingCategory?._id === category._id && (
                                <Badge variant="info" size="sm">
                                  Editing
                                </Badge>
                              )}
                            </div>
                          </Table.Cell>
                          <Table.Cell className="text-gray-500">
                            {category.slug}
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(category)}
                                disabled={editingCategory?._id === category._id}
                              >
                                <IoCreate className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteClick(category)}
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                              >
                                <IoTrash className="h-4 w-4" />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <Dialog.Content className="max-w-md">
          <Dialog.Title>Delete Category</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete the category "
            {categoryToDelete?.name}"? This action cannot be undone and may
            affect posts using this category.
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Category
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export default CategoryManageDialog;
