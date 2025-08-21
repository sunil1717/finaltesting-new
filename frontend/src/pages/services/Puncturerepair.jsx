import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiFlatTire, GiClockwiseRotation, GiCarWheel, GiFirstAidKit } from "react-icons/gi";

const PunctureRepair = () => {
  const services = [
    {
      icon: <GiFlatTire size={40} className="text-red-600" />,
      title: "Quick Repair",
      description: "Fast puncture repairs at your location to get you back on the road safely.",
      image: "/images/puncture-quick.jpg",
    },
    {
      icon: <GiClockwiseRotation size={40} className="text-red-600" />,
      title: "Reliable Methods",
      description: "Safe and effective patching techniques to ensure long-lasting results.",
      image: "/images/puncture-reliable.jpg",
    },
    {
      icon: <GiCarWheel size={40} className="text-red-600" />,
      title: "All Vehicle Types",
      description: "Service available for cars, SUVs, vans, and light commercial vehicles.",
      image: "/images/puncture-vehicles.jpg",
    },
    {
      icon: <GiFirstAidKit size={40} className="text-red-600" />,
      title: "Emergency Call-Out",
      description: "Available for urgent situations when you need immediate puncture repair.",
      image: "/images/puncture-emergency.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 sm:h-80 bg-red-400 mt-23 sm:mt-30 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Puncture Repair</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/puncture-banner.jpg" // replace with your real image
              alt="Puncture Repair"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Flat tyre? No worries! Our experts provide fast and safe puncture repairs
                to get you back on the road quickly and safely.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Quick puncture repair at your location</li>
                <li>Reliable and safe patching methods</li>
                <li>Service available for all vehicles</li>
                <li>Emergency call-out available</li>
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

export default PunctureRepair;
