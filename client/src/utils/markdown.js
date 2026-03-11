// Utility functions for markdown processing
// Note: You'll need to install these packages:
// npm install remark remark-html remark-gfm

import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

// Convert markdown to HTML
export const markdownToHtml = async (markdown) => {
  try {
    const result = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown support
      .use(remarkHtml, { sanitize: false }) // Convert to HTML
      .process(markdown);

    return result.toString();
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    return simpleMarkdownToHtml(markdown); // Fallback to simple converter
  }
};

// Simple synchronous markdown to HTML converter (basic implementation)
// This is a fallback if remark packages are not installed
export const simpleMarkdownToHtml = (markdown) => {
  if (!markdown) return "";

  return (
    markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

      // Bold
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/__(.*?)__/gim, "<strong>$1</strong>")

      // Italic
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/_(.*?)_/gim, "<em>$1</em>")

      // Code blocks
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      .replace(/`(.*?)`/gim, "<code>$1</code>")

      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )

      // Line breaks
      .replace(/\n\n/gim, "</p><p>")
      .replace(/\n/gim, "<br>")

      // Wrap in paragraphs
      .replace(/^(.+)$/gim, "<p>$1</p>")

      // Clean up multiple paragraph tags
      .replace(/<\/p><p>/gim, "</p>\n<p>")
      .replace(/<p><\/p>/gim, "")
      .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, "$1")
      .replace(/<p>(<pre>.*<\/pre>)<\/p>/gim, "$1")
  );
};

// Check if content is markdown (simple heuristic)
export const isMarkdown = (content) => {
  if (!content) return false;

  const markdownPatterns = [
    /^#{1,6}\s/m, // Headers
    /\*\*.*\*\*/m, // Bold
    /\*.*\*/m, // Italic
    /```[\s\S]*```/m, // Code blocks
    /`.*`/m, // Inline code
    /\[.*\]\(.*\)/m, // Links
    /^\s*[-*+]\s/m, // Lists
    /^\s*\d+\.\s/m, // Numbered lists
  ];

  return markdownPatterns.some((pattern) => pattern.test(content));
};

// Truncate HTML content for excerpts
export const truncateHtml = (html, maxLength = 150) => {
  if (!html) return "";

  // Remove HTML tags for length calculation
  const textContent = html.replace(/<[^>]*>/g, "");

  if (textContent.length <= maxLength) {
    return html;
  }

  // Truncate and add ellipsis
  const truncated = textContent.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const finalText =
    lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;

  return finalText + "...";
};
