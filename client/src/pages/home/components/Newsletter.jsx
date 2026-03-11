import { Button } from "@/components/ui";

function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Never Miss a Blog!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to get the latest blog, new tech, and exclusive news.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email id"
            required
            className="flex-1 px-6 py-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
