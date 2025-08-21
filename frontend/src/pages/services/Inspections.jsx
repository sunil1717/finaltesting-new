import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MdReportProblem, MdSpeed, MdBuild, MdChecklist } from "react-icons/md";

const Inspections = () => {
  const services = [
    {
      icon: <MdReportProblem size={40} className="text-red-600" />,
      title: "Comprehensive Tyre Checks",
      description: "Detailed tyre inspections to detect wear, punctures, and tread depth issues.",
      image: "/images/inspection-tyre.jpg",
    },
    {
      icon: <MdSpeed size={40} className="text-red-600" />,
      title: "Suspension & Alignment",
      description: "Ensure your vehicle's suspension and wheel alignment are optimal for safety and performance.",
      image: "/images/inspection-suspension.jpg",
    },
    {
      icon: <MdChecklist size={40} className="text-red-600" />,
      title: "Road Safety Compliance",
      description: "Full inspection to make sure your vehicles meet all legal safety requirements.",
      image: "/images/inspection-safety.jpg",
    },
    {
      icon: <MdBuild size={40} className="text-red-600" />,
      title: "Detailed Reports",
      description: "Receive thorough inspection reports so you know exactly what maintenance is needed.",
      image: "/images/inspection-report.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Page Banner */}
      <div className="relative h-64 mt-23 sm:mt-30 sm:h-80 bg-red-400 text-white flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Vehicle Inspections</h1>
      </div>

      <div className="mt-10 px-6 sm:px-12 mb-20">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white shadow-md rounded-lg p-8">
            <img
              src="/images/inspection-banner.jpg" // replace with your real image
              alt="Vehicle Inspections"
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-700 text-lg">
                Stay safe on the road with regular vehicle and tyre inspections. Our experts
                check for wear, damage, and safety compliance to ensure your fleet or personal
                vehicles are always road-ready.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Comprehensive tyre checks</li>
                <li>Suspension & alignment checks</li>
                <li>Road safety compliance</li>
                <li>Detailed inspection reports</li>
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

export default Inspections;
