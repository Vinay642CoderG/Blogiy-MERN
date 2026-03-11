import { useState, useCallback } from "react";
import { IoSparkles } from "react-icons/io5";
import Dialog from "../../../components/ui/Dialog";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import RichTextEditor from "../../../components/ui/RichTextEditor";

function PostFormDialog({ open, onClose, post }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    status: post?.status || "draft",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleContentChange = useCallback((content) => {
    setFormData((prev) => ({ ...prev, content }));
  }, []);

  const handleAIGenerate = () => {
    if (!formData.title) {
      alert("Please enter a title first to generate content");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation based on title (replace with actual API call)
    setTimeout(() => {
      const generatedContent = `# Introduction to ${formData.title}\n\nThis is a comprehensive guide about ${formData.title}. Here we'll explore various aspects and provide detailed insights.\n\n## Key Points\n\n- Important concept 1: Understanding the fundamentals of ${formData.title}\n- Important concept 2: Best practices and common patterns\n- Important concept 3: Advanced techniques and optimization\n\n## Getting Started\n\nTo begin working with ${formData.title}, you'll need to understand the core concepts. Let's dive into the details and explore how you can effectively use this in your projects.\n\n### Basic Usage\n\nHere's a simple example to get you started. This demonstrates the fundamental approach and common patterns you'll encounter.\n\n### Advanced Techniques\n\nOnce you're comfortable with the basics, you can explore more advanced features. These techniques will help you build more sophisticated solutions.\n\n## Best Practices\n\nWhen working with ${formData.title}, keep these best practices in mind:\n\n1. Always follow established conventions\n2. Write clean, maintainable code\n3. Test your implementation thoroughly\n4. Document your work for future reference\n\n## Conclusion\n\nIn this article, we've covered the fundamentals of ${formData.title}. By following these guidelines and practicing regularly, you'll become proficient in using these concepts effectively.`;

      setFormData((prev) => ({
        ...prev,
        content: generatedContent,
      }));
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <Dialog.Content className="max-w-4xl">
          <Dialog.Header>
            <Dialog.Title>
              {post ? "Edit Post" : "Create New Post"}
            </Dialog.Title>
            <Dialog.Description>
              Fill in the details below to {post ? "update" : "create"} your
              blog post
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.Body className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="post-url-slug"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <Textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description of the post"
                rows={3}
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAIGenerate}
                  type="button"
                  disabled={!formData.title || isGenerating}
                  isLoading={isGenerating}
                >
                  <IoSparkles className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </Button>
              </div>
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Write your post content here..."
                height={400}
              />
              {!formData.title && (
                <p className="text-xs text-gray-500 mt-1">
                  Enter a title above to enable AI content generation
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>{post ? "Update" : "Create"} Post</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export default PostFormDialog;
