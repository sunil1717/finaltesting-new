import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiCarWheel, GiAutoRepair, GiSpeedometer } from "react-icons/gi";
import { FaStar, FaTruck } from "react-icons/fa";

const Tyresales = () => {
  const services = [
    {
      icon: <FaStar size={40} className="text-red-600" />,
      title: "Premium Tyres",
      description: "Choose from top-quality tyres for maximum safety and performance.",
      image: "/images/tyresales-premium.jpg", // replace with your image
    },
    {
      icon: <FaTruck size={40} className="text-red-600" />,
      title: "Commercial Vehicles",
      description: "Wide range of tyres suitable for trucks, vans, and commercial vehicles.",
      image: "/images/tyresales-commercial.jpg",
    },
    {
      icon: <GiAutoRepair size={40} className="text-red-600" />,
      title: "Expert Recommendations",
      description: "Get advice from our experts to choose the best tyres for your vehicle.",
      image: "/images/tyresales-expert.jpg",
    },
    {
      icon: <GiSpeedometer size={40} className="text-red-600" />,
      title: "Delivery & Fitting",
      description: "Onsite delivery and fitting services to make it hassle-free for you.",
      image: "/images/tyresales-delivery.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 sm:h-80 bg-red-400 mt-23 sm:mt-30 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Tyre Sales</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/tyresales-banner.jpg" // replace with your image
              alt="Tyre Sales"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Choose from a wide range of premium and budget tyres for cars, SUVs, and commercial vehicles. We stock trusted brands to ensure safety, performance, and durability.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Top tyre brands available</li>
                <li>Competitive pricing with warranty</li>
                <li>Expert recommendations for your vehicle</li>
                <li>Onsite delivery and fitting options</li>
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
}

export default Tyresales;
