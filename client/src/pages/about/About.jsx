function About() {
  return (
    <div className="min-h-screen bg-purple-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to My Blog
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This is my personal space where I share my thoughts, experiences,
              and insights on topics I'm passionate about. Whether it's
              technology, life lessons, or creative ideas, this is where I
              express myself and connect with readers like you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What You'll Find Here
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I write about things that matter to me and hopefully resonate with
              you. This platform is designed to be a simple, distraction-free
              reading experience where you can explore my content and join the
              conversation.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">•</span>
                <span>Original content written by me on various topics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <span>Engage through comments and discussions on posts</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3 mt-1">•</span>
                <span>
                  Browse content by categories to find what interests you
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3 mt-1">•</span>
                <span>
                  AI-powered features to enhance your reading experience
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              My Values
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Authenticity
                </h3>
                <p className="text-gray-700 text-sm">
                  Sharing genuine thoughts and original perspectives.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-700 text-sm">
                  Building meaningful connections with readers.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-5 border-l-4 border-pink-600">
                <h3 className="font-semibold text-gray-900 mb-2">Simplicity</h3>
                <p className="text-gray-700 text-sm">
                  Keeping the focus on content that matters.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
                <h3 className="font-semibold text-gray-900 mb-2">Growth</h3>
                <p className="text-gray-700 text-sm">
                  Continuously learning and sharing knowledge.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              Thank you for visiting my blog. I hope you find something here
              that inspires, informs, or entertains you. Feel free to leave
              comments and join the conversation—I love hearing from readers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
