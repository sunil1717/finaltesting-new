import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GiCarWheel, GiAutoRepair, GiClockwiseRotation, GiSpeedometer } from "react-icons/gi";
import { GrRotateRight } from "react-icons/gr";

const Rotations = () => {
  const services = [
    {
      icon: <GiCarWheel size={40} className="text-red-600" />,
      title: "Extended Tyre Life",
      description: "Regular rotations help prevent uneven wear and extend the lifespan of your tyres.",
      image: "/images/rotation-lifespan.jpg",
    },
    {
      icon: <GiAutoRepair size={40} className="text-red-600" />,
      title: "Improved Handling",
      description: "Balanced tyre wear ensures smooth and safe handling for your vehicle.",
      image: "/images/rotation-handling.jpg",
    },
    {
      icon: <GiClockwiseRotation size={40} className="text-red-600" />,
      title: "Even Tread Wear",
      description: "Rotating tyres evenly distributes tread wear across all tyres for better performance.",
      image: "/images/rotation-tread.jpg",
    },
    {
      icon: <GiSpeedometer size={40} className="text-red-600" />,
      title: "Recommended Schedule",
      description: "We recommend tyre rotation every 10,000 km to maintain optimal tyre performance.",
      image: "/images/rotation-schedule.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 sm:h-80 bg-red-400 mt-23 sm:mt-30 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Tyre Rotations</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/rotation-banner.jpg" // replace with your real image
              alt="Tyre Rotations"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Regular tyre rotation improves tyre life and ensures even wear for maximum performance and safety.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Extends tyre lifespan</li>
                <li>Improves vehicle handling</li>
                <li>Balances tread wear</li>
                <li>Recommended every 10,000 km</li>
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

export default Rotations;
