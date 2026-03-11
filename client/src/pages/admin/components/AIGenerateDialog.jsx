import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoSparkles, IoClose } from "react-icons/io5";
import { Dialog, Button, Input, FormField } from "@/components/ui";
import { generatePostContent } from "@/redux/slices/postSlice";

function AIGenerateDialog({ isOpen, onClose, onContentGenerated }) {
  const dispatch = useDispatch();
  const { aiGeneration } = useSelector((state) => state.posts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(generatePostContent(data)).unwrap();

      // Pass the generated content back to the parent component
      if (onContentGenerated) {
        onContentGenerated(result);
      }

      toast.success("Content generated successfully!");
      onClose();
      reset();
    } catch (error) {
      toast.error(error || "Failed to generate content");
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content className="max-w-md mx-4">
        <Dialog.Title className="sr-only">Generate AI Content</Dialog.Title>

        {/* Custom Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
            <IoSparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Generate AI Content
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Let AI create engaging blog content for you
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormField
            label="Blog Post Title"
            error={errors.title?.message}
            required
          >
            <Input
              placeholder="Enter the topic or title for your blog post"
              className="h-12 text-base"
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <IoSparkles className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  AI Content Generation
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Our AI will create comprehensive blog content based on your
                  title. The generated content will be in markdown format, which
                  you can edit and customize.
                </p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {aiGeneration.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {aiGeneration.error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={aiGeneration.loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={aiGeneration.loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <IoSparkles className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}

export default AIGenerateDialog;
