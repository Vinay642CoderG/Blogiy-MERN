function BlogContent({ content }) {
  return (
    <div className="px-8">
      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default BlogContent;
