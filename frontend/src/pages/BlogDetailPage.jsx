import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        setBlog(res.data.data);

        const allBlogsRes = await axios.get("/api/blogs/getall");
        const others = (allBlogsRes.data.data || []).filter(
          (b) => b.slug !== slug
        );
        setOtherBlogs(others);
      } catch (err) {
        console.error("Failed to load blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading blog...</p>;
  if (!blog)
    return <p className="text-center py-10 text-red-500">Blog not found.</p>;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-80 sm:h-96 mt-20 sm:mt-37">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover brightness-75"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg"
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-2 text-sm sm:text-base text-gray-200"
          >
            Published on: {new Date(blog.createdAt).toLocaleDateString()}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mt-12 flex flex-col lg:flex-row gap-10">
        {/* Left: Main Content */}
        <motion.div
          className="lg:w-3/5 text-gray-700 space-y-6 text-justify leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {(blog.description || "")
            .split("\n")
            .filter((para) => para.trim() !== "")
            .map((para, idx) => (
              <motion.p
                key={idx}
                className="break-words whitespace-pre-wrap"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {para}
              </motion.p>
            ))}
        </motion.div>

        {/* Right: Other Blogs Sidebar */}
        <div className="lg:w-2/5 flex flex-col gap-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-32">
            <h3 className="text-xl font-semibold text-red-600 mb-5">
              Other Blogs
            </h3>
            <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {otherBlogs.length === 0 && (
                <p className="text-gray-500 text-sm">No other blogs available.</p>
              )}
              {otherBlogs.map((b) => (
                <li key={b._id}>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition"
                  >
                    {b.image && (
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium text-sm line-clamp-2">
                        {b.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* See More Posts */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/blogs"
          className="bg-red-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-red-700 transition"
        >
          See More Posts
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetailPage;
