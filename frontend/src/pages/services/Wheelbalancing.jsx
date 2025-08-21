import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiCarWheel } from "react-icons/gi";
import { FaCogs, FaRoad, FaShieldAlt, FaTachometerAlt } from "react-icons/fa";

const Wheelbalancing = () => {
  const services = [
    {
      icon: <FaCogs size={40} className="text-red-600" />,
      title: "Precision Equipment",
      description: "We use state-of-the-art balancing machines for accurate results.",
      image: "/images/wheel-precision.jpg",
    },
    {
      icon: <FaRoad size={40} className="text-red-600" />,
      title: "Smooth Driving",
      description: "Eliminates vibrations while driving for better comfort.",
      image: "/images/wheel-smooth.jpg",
    },
    {
      icon: <FaShieldAlt size={40} className="text-red-600" />,
      title: "Safety First",
      description: "Protects suspension components and ensures vehicle safety.",
      image: "/images/wheel-safety.jpg",
    },
    {
      icon: <FaTachometerAlt size={40} className="text-red-600" />,
      title: "Improved Performance",
      description: "Enhances tyre life and overall vehicle performance.",
      image: "/images/wheel-performance.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 sm:h-80 mt-23 sm:mt-30 bg-red-400 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Wheel Balancing</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/wheel-banner.jpg"
              alt="Wheel Balancing"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Ensure smooth driving and reduced tyre wear with our professional wheel balancing services. 
                Our experts use modern equipment to provide precise results.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Eliminates vibrations while driving</li>
                <li>Protects suspension components</li>
                <li>Improves vehicle safety</li>
                <li>Done using modern equipment</li>
              </ul>
            </div>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wheelbalancing;
