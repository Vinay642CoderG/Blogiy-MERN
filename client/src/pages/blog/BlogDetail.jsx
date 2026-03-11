import { useParams } from "react-router-dom";
import BlogHeader from "./components/BlogHeader";
import BlogContent from "./components/BlogContent";
import BlogTags from "./components/BlogTags";
import BlogActions from "./components/BlogActions";
import CommentSection from "./components/CommentSection";

function BlogDetail() {
  const { id } = useParams();

  // Mock blog data - replace with actual API call
  const blog = {
    id: id,
    title: "Getting Started with React and Modern Web Development",
    author: "Blog Owner",
    date: "March 10, 2026",
    readTime: "8 min read",
    category: "Technology",
    tags: ["React", "JavaScript", "Web Development"],
    image: "https://via.placeholder.com/1200x600",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Introduction</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Main Content</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      
      <h2>Conclusion</h2>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
    `,
  };

  const initialComments = [
    {
      id: 1,
      author: "John Doe",
      content: "Great article! Very informative and well written.",
      date: "2 days ago",
      avatar: "JD",
    },
    {
      id: 2,
      author: "Jane Smith",
      content:
        "Thanks for sharing this. Looking forward to more posts like this.",
      date: "1 day ago",
      avatar: "JS",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Blog Article */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <BlogHeader blog={blog} />
          <BlogContent content={blog.content} />
          <BlogTags tags={blog.tags} />
          <BlogActions />
        </article>

        {/* Comments Section */}
        <CommentSection initialComments={initialComments} />
      </div>
    </div>
  );
}

export default BlogDetail;
