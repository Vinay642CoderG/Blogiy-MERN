import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { marked } from "marked";
import { IoDocumentText, IoAdd, IoSparkles, IoClose } from "react-icons/io5";
import { Dialog, Button, Input, FormField, Textarea } from "@/components/ui";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  createPost,
  updatePost,
  generatePostContent,
} from "@/redux/slices/postSlice";
import { categoryApi } from "@/api/api";

function PostFormDialog({ open, onClose, post = null, onSuccess }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const isEditing = !!post;

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      tags: "",
      status: "draft",
      category: "",
      featuredImage: null,
    },
  });

  const watchedTitle = watch("title");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await categoryApi.getCategories();
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  // Set form values when post or categories change
  useEffect(() => {
    if (isEditing && post && open) {
      // Store original post data
      setOriginalPost(post);

      // Only set form values after categories are loaded (or if post has no category)
      if (!loadingCategories) {
        const formValues = {
          title: post.title || "",
          content: post.content || "",
          excerpt: post.excerpt || "",
          tags: post.tags ? post.tags.join(", ") : "",
          status: post.status || "draft",
          category: post.category?._id || "",
          featuredImage: null,
        };

        reset(formValues);

        // Set image preview for existing post
        if (post.featuredImage) {
          setImagePreview(
            post._featuredImage?.url ||
              `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/${post.featuredImage}`,
          );
        }
      }
    } else if (!isEditing && open) {
      setOriginalPost(null);
      reset({
        title: "",
        content: "",
        excerpt: "",
        tags: "",
        status: "draft",
        category: "",
        featuredImage: null,
      });
      setImagePreview(null);
    }
  }, [post, isEditing, reset, open, loadingCategories]);

  const onSubmit = async (data) => {
    try {
      // Validate content manually since RichTextEditor doesn't use register
      const content = watch("content");
      if (!content || content.trim().length < 10) {
        toast.error("Content is required and must be at least 10 characters");
        return;
      }

      const formData = { ...data, content };

      // Handle empty values - remove them or convert to undefined
      if (!formData.tags || formData.tags.trim() === "") {
        delete formData.tags;
      }
      if (!formData.category || formData.category.trim() === "") {
        delete formData.category;
      }

      // Handle file upload
      if (data.featuredImage && data.featuredImage[0]) {
        formData.featuredImage = data.featuredImage[0];
      } else {
        delete formData.featuredImage;
      }

      // Convert tags string to array if it exists
      if (formData.tags) {
        formData.tags = formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      }

      if (isEditing) {
        await dispatch(
          updatePost({ id: post._id, postData: formData }),
        ).unwrap();
        toast.success("Post updated successfully!");
      } else {
        await dispatch(createPost(formData)).unwrap();
        toast.success("Post created successfully!");
      }

      onClose();
      reset();
      setOriginalPost(null);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error || `Failed to ${isEditing ? "update" : "create"} post`);
    }
  };

  const handleClose = () => {
    // Reset to original values if editing and changes weren't saved
    if (isEditing && originalPost) {
      setValue("title", originalPost.title || "");
      setValue("content", originalPost.content || "");
      setValue("excerpt", originalPost.excerpt || "");
      setValue("tags", originalPost.tags ? originalPost.tags.join(", ") : "");
      setValue("status", originalPost.status || "draft");
      setValue("category", originalPost.category?._id || "");

      // Reset image preview to original
      if (originalPost.featuredImage) {
        setImagePreview(
          originalPost._featuredImage?.url ||
            `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/uploads/${originalPost.featuredImage}`,
        );
      } else {
        setImagePreview(null);
      }
    } else {
      reset();
      setImagePreview(null);
    }

    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("featuredImage", null);
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Cleanup image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleGenerateContent = async () => {
    const title = watch("title");

    if (!title || title.trim().length < 3) {
      toast.error("Please enter a title first to generate content");
      return;
    }

    try {
      setGeneratingContent(true);

      const response = await dispatch(
        generatePostContent({
          title: title.trim(),
        }),
      ).unwrap();

      if (response.content) {
        // Convert markdown to HTML using marked
        const htmlContent = marked(response.content);
        setValue("content", htmlContent);
        toast.success("Content generated successfully!");
      }
      if (response.excerpt && !watch("excerpt")) {
        setValue("excerpt", response.excerpt);
      }
    } catch (error) {
      toast.error(error || "Failed to generate content");
    } finally {
      setGeneratingContent(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <Dialog.Content className="w-full max-w-6xl mx-2 sm:mx-4 h-[95vh] max-h-[95vh] overflow-hidden flex flex-col">
          <Dialog.Title className="sr-only">
            {isEditing ? "Edit Post" : "Create New Post"}
          </Dialog.Title>

          {/* Custom Header */}
          <div className="flex flex-col gap-4 p-4 sm:p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`p-2 sm:p-3 rounded-xl ${isEditing ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
              >
                {isEditing ? (
                  <IoDocumentText className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <IoAdd className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {isEditing ? "Edit Post" : "Create New Post"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {isEditing
                    ? "Update your blog post content and settings"
                    : "Create engaging content for your blog"}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 sm:p-6 space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Title Field */}
                <FormField
                  label="Post Title"
                  error={errors.title?.message}
                  required
                  className="lg:col-span-2"
                >
                  <Input
                    placeholder="Enter an engaging title for your post"
                    className="h-12 text-base font-medium"
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Title must not exceed 200 characters",
                      },
                    })}
                  />
                </FormField>

                {/* Featured Image Field - Moved to top */}
                <FormField
                  label="Featured Image (Optional)"
                  error={errors.featuredImage?.message}
                  className="lg:col-span-2"
                >
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      className="h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                      {...register("featuredImage")}
                      onChange={handleImageChange}
                    />

                    {/* Enhanced Image Preview */}
                    {imagePreview && (
                      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="relative shrink-0">
                          <img
                            src={imagePreview}
                            alt="Featured image preview"
                            className="w-full sm:w-48 h-32 sm:h-32 rounded-lg border border-gray-300 object-cover shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors duration-200"
                          >
                            <IoClose className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Featured Image Preview
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            This image will be displayed as the main visual for
                            your post
                          </p>
                          <p className="text-xs text-gray-500">
                            Click the × button to remove and select a different
                            image
                          </p>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      Upload a featured image for your post (JPG, PNG, GIF • Max
                      size: 5MB)
                    </p>
                  </div>
                </FormField>

                {/* Status Field */}
                <FormField
                  label="Status"
                  error={errors.status?.message}
                  required
                >
                  <select
                    className="w-full h-12 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 hover:border-gray-400"
                    {...register("status", { required: "Status is required" })}
                  >
                    <option value="draft">📝 Draft</option>
                    <option value="published">🌟 Published</option>
                    <option value="archived">📦 Archived</option>
                  </select>
                </FormField>

                {/* Category Field */}
                <FormField label="Category" error={errors.category?.message}>
                  <select
                    className="w-full h-12 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 hover:border-gray-400"
                    {...register("category")}
                    disabled={loadingCategories}
                  >
                    <option value="">
                      {loadingCategories
                        ? "Loading categories..."
                        : "Select a category (optional)"}
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {loadingCategories && (
                    <p className="text-xs text-blue-600 mt-1 flex items-center">
                      <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></span>
                      Loading categories...
                    </p>
                  )}
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Tags Field */}
                <FormField label="Tags" error={errors.tags?.message}>
                  <Input
                    placeholder="Enter tags separated by commas"
                    className="h-12 text-base"
                    {...register("tags")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple tags with commas (e.g., technology, web
                    development, react)
                  </p>
                </FormField>
              </div>

              {/* Content Field */}
              <FormField
                label="Content"
                error={errors.content?.message}
                required
                className="lg:col-span-2"
              >
                <RichTextEditor
                  value={watch("content") || ""}
                  onChange={(value) => setValue("content", value)}
                  placeholder="Write your post content here..."
                  className="min-h-[300px]"
                />

                {/* AI Generate Button */}
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateContent}
                    disabled={generatingContent || !watchedTitle}
                    className="bg-linear-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-blue-100"
                  >
                    <IoSparkles className="h-4 w-4 mr-2" />
                    {generatingContent
                      ? "Generating..."
                      : "AI Generate Content"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 AI will generate content based on your post title
                  </p>
                </div>
              </FormField>

              {/* Excerpt Field */}
              <FormField
                label="Excerpt"
                error={errors.excerpt?.message}
                required
              >
                <Textarea
                  placeholder="Brief description of your post (required)"
                  className="h-24 text-base"
                  {...register("excerpt", {
                    required: "Excerpt is required",
                    minLength: {
                      value: 10,
                      message: "Excerpt must be at least 10 characters",
                    },
                    maxLength: {
                      value: 300,
                      message: "Excerpt must not exceed 300 characters",
                    },
                  })}
                />
              </FormField>
            </form>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {isEditing ? "💾 Update Post" : "✨ Create Post"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export default PostFormDialog;
