import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaRecycle, FaLeaf, FaIndustry } from "react-icons/fa";

const Recycling = () => {
  const services = [
    {
      icon: <FaLeaf size={40} className="text-red-600" />,
      title: "Eco-Friendly Disposal",
      description: "Old tyres are disposed of responsibly to minimize environmental impact.",
      image: "/images/recycling-eco.jpg",
    },
    {
      icon: <FaIndustry size={40} className="text-red-600" />,
      title: "Compliance Guaranteed",
      description: "100% adherence to recycling laws and safety standards.",
      image: "/images/recycling-compliance.jpg",
    },
    {
      icon: <FaRecycle size={40} className="text-red-600" />,
      title: "Waste Reduction",
      description: "Reducing landfill waste by recycling tyres into reusable materials.",
      image: "/images/recycling-waste.jpg",
    },
    {
      icon: <FaRecycle size={40} className="text-red-600" />,
      title: "Sustainable Practices",
      description: "Supporting sustainable and circular economy practices in tyre management.",
      image: "/images/recycling-sustainable.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 sm:h-80 mt-23 sm:mt-30 bg-red-400 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Tyre Recycling</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/recycling-banner.jpg"
              alt="Tyre Recycling"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                We care about the environment. Old and worn-out tyres are safely recycled
                to reduce waste and promote sustainability.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Eco-friendly tyre disposal</li>
                <li>100% compliance with recycling laws</li>
                <li>Reducing landfill waste</li>
                <li>Supporting sustainable practices</li>
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

export default Recycling;
