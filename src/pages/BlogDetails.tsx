// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();

  // 1. Set up state variables
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch data when the component mounts or the ID changes


  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchBlog = async () => {
      
      try {
        setLoading(true);
        // Replace this URL with your actual backend API endpoint
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/blogs/${id}`,
        );
        setBlog(response.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // 3. Handle Loading and Error states
  if (loading) {
    return (
      <div className="py-24 bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading blog details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-slate-900 text-red-400 min-h-screen flex items-center justify-center">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!blog) return null;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 5. Render the UI
  return (
    <div className="py-24 md:py-32 bg-slate-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-50">
            {blog.title}
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Published on {formattedDate}
          </p>
        </header>

        {/* Image Section */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-800">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${blog.image}`} // Prepend with '/' assuming 'public' is your root static folder
            alt={blog?.title}
            className="w-full h-auto object-cover max-h-125"
          />
        </div>

        {/* Content Section */}
        <article className="prose prose-lg prose-invert mx-auto max-w-none">
          <p className="text-slate-300 leading-relaxed">{blog?.content}</p>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
