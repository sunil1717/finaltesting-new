import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MdBuild, MdLocationOn, MdSpeed, MdCarRepair, MdTimer } from "react-icons/md";

const OnsiteFitting = () => {
  const services = [
    {
      icon: <MdLocationOn size={40} className="text-red-600" />,
      title: "Mobile Service",
      description: "We come to your home, workplace, or preferred location for convenient tyre fitting.",
      image: "/images/onsite-mobile.jpg",
    },
    {
      icon: <MdSpeed size={40} className="text-red-600" />,
      title: "Quick & Reliable",
      description: "Our team ensures fast, efficient, and professional tyre fitting services on-site.",
      image: "/images/onsite-quick.jpg",
    },
    {
      icon: <MdCarRepair size={40} className="text-red-600" />,
      title: "For All Vehicles",
      description: "We provide on-site fitting for cars, SUVs, and vans using professional equipment.",
      image: "/images/onsite-vehicles.jpg",
    },
    {
      icon: <MdTimer size={40} className="text-red-600" />,
      title: "Saves Time",
      description: "Avoid driving to a workshop—our mobile service saves you time and effort.",
      image: "/images/onsite-time.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative  mt-23 sm:mt-30 h-64 sm:h-80 bg-red-400 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Onsite Fitting</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/onsite-banner.jpg" // replace with your real image
              alt="Onsite Fitting"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Get your tyres fitted at your home, workplace, or anywhere convenient. Our
                mobile service vans are equipped with the latest technology for hassle-free
                fitting.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mobile service at your doorstep</li>
                <li>Quick and reliable fitting</li>
                <li>Available for cars, SUVs, and vans</li>
                <li>Saves you time and effort</li>
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

export default OnsiteFitting;
