// src/pages/AllBlogs.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs/getall');
        setBlogs(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Split blogs: first one as latest, rest as all blogs
  const latestBlog = blogs[0];
  const allOtherBlogs = blogs.slice(1);

  return (
    <>
      <Navbar />

      <section className="py-16 px-6 sm:px-10 bg-gray-50 min-h-screen mt-16 sm:mt-24">
        <h2 className="text-4xl font-bold text-gray-700 mb-12  text-center">
          Our Blogs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
            {/* Left: Latest Blog */}
            
            {latestBlog && (
              <div className="lg:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden">
                
                <img
                  src={latestBlog.image}
                  alt={latestBlog.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(latestBlog.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{latestBlog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-4">{latestBlog.description}</p>
                  <Link
                    to={`/blog/${latestBlog.slug}`}
                    className="text-red-600 font-semibold hover:text-red-800 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            )}

            {/* Right: All Other Blogs */}
            <div className="lg:w-2/3 flex flex-col gap-6">
              {allOtherBlogs.map((post, index) => (
                <div
                  key={post._id || index}
                  className="bg-white rounded-xl shadow hover:shadow-2xl overflow-hidden flex flex-col md:flex-row transition-shadow duration-300"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                    />
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-block text-red-600 font-semibold text-sm hover:text-red-800 hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default AllBlogs;
