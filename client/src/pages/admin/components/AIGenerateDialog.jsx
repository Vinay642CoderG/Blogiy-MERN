import { useState } from "react";
import { IoSparkles, IoRefresh } from "react-icons/io5";
import Dialog from "../../../components/ui/Dialog";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";

function AIGenerateDialog({ open, onClose, onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    title: "",
    content: "",
    excerpt: "",
  });

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      setGeneratedContent({
        title: `${prompt} - A Comprehensive Guide`,
        excerpt: `Learn everything you need to know about ${prompt} in this detailed guide.`,
        content: `# Introduction to ${prompt}\n\nThis is a comprehensive guide about ${prompt}. Here we'll explore various aspects and provide detailed insights.\n\n## Key Points\n\n- Important concept 1\n- Important concept 2\n- Important concept 3\n\n## Conclusion\n\nIn this article, we've covered the fundamentals of ${prompt}.`,
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleUseGenerated = () => {
    onGenerate(generatedContent);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title className="flex items-center gap-2">
            <IoSparkles className="h-5 w-5 text-blue-600" />
            Generate Content with AI
          </Dialog.Title>
          <Dialog.Description>
            Describe what you want to write about, and AI will generate content
            for you
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Body className="space-y-4">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What do you want to write about?
            </label>
            <div className="flex gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., React hooks, TypeScript best practices..."
                className="flex-1"
              />
              <Button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                isLoading={isGenerating}
              >
                <IoSparkles className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>

          {/* Generated Content Preview */}
          {generatedContent.title && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Generated Content
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <IoRefresh className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>

              {/* Title Preview */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Title
                </label>
                <div className="p-3 bg-gray-50 rounded-md text-sm">
                  {generatedContent.title}
                </div>
              </div>

              {/* Excerpt Preview */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Excerpt
                </label>
                <div className="p-3 bg-gray-50 rounded-md text-sm">
                  {generatedContent.excerpt}
                </div>
              </div>

              {/* Content Preview */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Content
                </label>
                <div className="p-3 bg-gray-50 rounded-md text-sm max-h-64 overflow-y-auto whitespace-pre-wrap">
                  {generatedContent.content}
                </div>
              </div>
            </div>
          )}
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUseGenerated}
            disabled={!generatedContent.title}
          >
            Use Generated Content
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

export default AIGenerateDialog;
