import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Users, Award, Target } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-400 text-white py-20 px-6 mt-25 sm:mt-35 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Us
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg">
          We’re more than just a tyre store. We’re a team dedicated to keeping
          you safe on the road while delivering the best value and service.
        </p>
      </div>

      {/* Who We Are Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
          alt="Our Team"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Our journey started with a passion for automobiles and a commitment
            to delivering exceptional service. Over the years, we’ve built trust
            with thousands of happy customers by focusing on **quality, safety,
            and reliability**.
          </p>
        </motion.div>
      </div>

      {/* Mission / Vision / Values Section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide reliable tyres and unmatched customer service that keeps
              you safe on every journey.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted tyre partner, known for innovation and
              customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">
              Integrity, reliability, and excellence drive everything we do.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 px-6 bg-red-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Experience the Difference?
        </h2>
        <p className="mb-6 max-w-xl mx-auto">
          Join thousands of customers who trust us with their tyres and safety.
        </p>
        <a
          href="/#contact"
          className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
