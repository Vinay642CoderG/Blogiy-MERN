import { useState } from "react";
import {
  HiMail,
  HiChatAlt,
  HiQuestionMarkCircle,
  HiLightBulb,
} from "react-icons/hi";

function Contact() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Have questions about the blog or want to connect? I'd love to hear
            from you!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "contact"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "faq"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <HiMail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Me
                </h3>
                <p className="text-gray-600 mb-3">
                  Send me an email for any questions, feedback, or collaboration
                  ideas
                </p>
                <a
                  href="mailto:hello@blogify.com"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  hello@blogify.com
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <HiChatAlt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Join the Conversation
                </h3>
                <p className="text-gray-600 mb-3">
                  The best way to connect is through comments on blog posts
                </p>
                <a
                  href="/"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                >
                  Browse Posts →
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiLightBulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quick Response
                  </h3>
                  <p className="text-gray-700 text-sm">
                    I typically respond to emails within 24-48 hours. For
                    immediate engagement, leave a comment on any blog post - I
                    actively monitor and respond to all comments!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <HiQuestionMarkCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I read blog posts?
                </h3>
                <p className="text-gray-700">
                  All posts are displayed on the home page. You can scroll
                  through them, use the search bar to find specific content, or
                  filter by categories using the category pills below the search
                  bar.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do I need an account to comment?
                </h3>
                <p className="text-gray-700">
                  No! You can leave comments on any post without creating an
                  account. Just provide your name and write your comment - it's
                  that simple.
                </p>
              </div>

              <div className="border-l-4 border-pink-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How does the search feature work?
                </h3>
                <p className="text-gray-700">
                  The search bar provides real-time results as you type. It
                  searches through post titles, content, and categories. You can
                  also combine search with category filters for more precise
                  results.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I write guest posts?
                </h3>
                <p className="text-gray-700">
                  This is a personal blog, so I write all the content myself.
                  However, I love engaging with readers through comments and
                  discussions on posts. Your insights and perspectives in the
                  comments are always welcome!
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How often are new posts published?
                </h3>
                <p className="text-gray-700">
                  I publish new posts regularly, covering various topics that
                  interest me. The home page always shows the latest posts
                  first, so you'll never miss new content when you visit.
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What makes this blog different?
                </h3>
                <p className="text-gray-700">
                  Blogify focuses on simplicity and user experience. Everything
                  is on one page with powerful search and filtering, no account
                  required for commenting, and AI-enhanced content for better
                  insights. It's designed to be fast, accessible, and enjoyable
                  to use.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
