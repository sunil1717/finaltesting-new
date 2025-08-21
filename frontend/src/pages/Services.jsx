import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import { useNavigate } from "react-router-dom";
import { FaTruck, FaRecycle } from "react-icons/fa";
import { MdBuild, MdReportProblem } from "react-icons/md";
import { GiCarWheel, GiFlatTire } from "react-icons/gi";
import { GrRotateRight } from "react-icons/gr";


const Services = () => {
  const navigate = useNavigate();


  const services = [
    { name: "Tyre sales", icon: <GiCarWheel size={50} />, link: "/services/tyre-sales" },
    { name: "Fleet", icon: <FaTruck size={50} />, link: "/services/fleet" },
    { name: "Onsite fitting", icon: <MdBuild size={50} />, link: "/services/onsite-fitting" },
    { name: "Puncture repair", icon: <GiFlatTire size={50} />, link: "/services/puncture-repair" },
    { name: "Rotations", icon: <GrRotateRight size={50} />, link: "/services/rotations" },
    { name: "Wheel balancing", icon: <GiCarWheel size={50} />, link: "/services/wheel-balancing" },
    { name: "Inspections", icon: <MdReportProblem size={50} />, link: "/services/inspections" },
    { name: "Recycling", icon: <FaRecycle size={50} />, link: "/services/recycling" },
  ];




  return (
    <>
      <Navbar />
      <div className="mt-25 sm:mt-33">
        <div className=" py-5">
          <div className=" mb-10 flex  justify-center text-gray-700 items-center bg-red-400  h-64 sm:h-80">
             <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">Our Services</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => navigate(service.link)}
                className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 shadow cursor-pointer hover:bg-gray-200 hover:scale-105 transition"
              >
                <div className="mb-3 text-black">{service.icon}</div>
                <span className="font-medium">{service.name}</span>
                <p className='mt-5 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odit natus eveniet esse alias saepe nam itaque quibusdam quae? Unde recusandae voluptates quod id nihil repudiandae commodi provident corrupti accusantium neque aut itaque mollitia, placeat tenetur vel a reiciendis rem nesciunt saepe in magni eaque? Harum, quis?</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}

export default Services