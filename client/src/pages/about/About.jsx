function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Blogify
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to My Personal Blog
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Blogify is my personal space where I share thoughts, experiences,
              and insights on topics I'm passionate about. This platform
              combines modern technology with a clean, distraction-free reading
              experience to help you discover and engage with content that
              matters.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What You'll Find Here
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This blog is designed to be your go-to destination for quality
              content with powerful features to enhance your reading experience:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">🏠</span>
                <span>
                  <strong>Centralized Home:</strong> All posts are displayed on
                  the home page with smart search and category filtering
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">🔍</span>
                <span>
                  <strong>Real-time Search:</strong> Find posts instantly as you
                  type - search by title, content, or category
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 mt-1">🏷️</span>
                <span>
                  <strong>Category Filtering:</strong> Browse posts by category
                  with easy-to-use filter pills
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">💬</span>
                <span>
                  <strong>Anonymous Comments:</strong> Join discussions without
                  needing to create an account
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-3 mt-1">🤖</span>
                <span>
                  <strong>AI-Powered Content:</strong> Some posts are enhanced
                  with AI-generated content for better insights
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 mt-1">📱</span>
                <span>
                  <strong>Responsive Design:</strong> Perfect reading experience
                  on any device
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  📖 Reading Posts
                </h3>
                <p className="text-gray-700 text-sm">
                  Browse all posts on the home page, use search to find specific
                  content, or filter by categories to discover topics you love.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  💭 Commenting
                </h3>
                <p className="text-gray-700 text-sm">
                  Share your thoughts on any post! Just provide your name and
                  comment - no account registration required.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-5 border-l-4 border-pink-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🔍 Searching
                </h3>
                <p className="text-gray-700 text-sm">
                  Use the search bar in the hero section to find posts
                  instantly. Search works across titles, content, and
                  categories.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🏷️ Categories
                </h3>
                <p className="text-gray-700 text-sm">
                  Click on category pills below the search bar to filter posts
                  by specific topics that interest you.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              My Values
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border-l-4 border-blue-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🎯 Simplicity
                </h3>
                <p className="text-gray-700 text-sm">
                  Clean, distraction-free design that puts content first and
                  makes reading enjoyable.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border-l-4 border-purple-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🤝 Accessibility
                </h3>
                <p className="text-gray-700 text-sm">
                  No barriers to entry - read and comment without creating
                  accounts or jumping through hoops.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-5 border-l-4 border-pink-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ⚡ Performance
                </h3>
                <p className="text-gray-700 text-sm">
                  Fast loading, real-time search, and smooth interactions for
                  the best user experience.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border-l-4 border-green-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  💡 Innovation
                </h3>
                <p className="text-gray-700 text-sm">
                  Leveraging modern technology and AI to create better content
                  and user experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              Thank you for visiting Blogify! I hope you find the content
              valuable and the experience enjoyable. Feel free to leave comments
              on posts and join the conversation - I love hearing from readers
              and engaging with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
