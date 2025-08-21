import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTruck, FaTools, FaClock, FaHandshake } from "react-icons/fa";

const Fleet = () => {
  const services = [
    {
      icon: <FaTruck size={40} className="text-red-600" />,
      title: "Tyre Replacement & Balancing",
      description: "Quick and efficient tyre replacement and balancing to ensure your fleet runs safely.",
      image: "/images/fleet-tyres.jpg", // replace with your real image
    },
    {
      icon: <FaTools size={40} className="text-red-600" />,
      title: "Regular Fleet Inspections",
      description: "Scheduled inspections to prevent breakdowns and keep vehicles in top condition.",
      image: "/images/fleet-inspection.jpg",
    },
    {
      icon: <FaClock size={40} className="text-red-600" />,
      title: "Onsite Service",
      description: "We come to your location to service your fleet, reducing downtime and hassle.",
      image: "/images/fleet-onsite.jpg",
    },
    {
      icon: <FaHandshake size={40} className="text-red-600" />,
      title: "Custom Business Packages",
      description: "Tailored fleet maintenance plans to fit the unique needs of your business.",
      image: "/images/fleet-package.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative mt-23 sm:mt-30 h-64 sm:h-80 bg-red-400 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Fleet Services</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/fleet-banner.jpg" // replace with your fleet image
              alt="Fleet Services"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                We provide complete fleet management solutions including tyre care,
                inspections, rotations, and replacements to keep your commercial
                vehicles running smoothly and safely.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Tyre replacement and balancing</li>
                <li>Regular fleet inspections</li>
                <li>Onsite service for minimum downtime</li>
                <li>Custom packages for businesses</li>
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
  )
}

export default Fleet;
