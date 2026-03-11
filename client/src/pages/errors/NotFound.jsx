import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiHome, HiArrowLeft, HiExclamation } from "react-icons/hi";
import { Button } from "../../components/ui";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <HiExclamation className="h-16 w-16 text-yellow-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500">
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <HiArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Link to="/">
            <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <HiHome className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Or explore these popular sections:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Latest Posts
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              About Me
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
