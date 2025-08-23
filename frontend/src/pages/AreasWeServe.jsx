import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AreasWeServe = () => {
  const [suburbs, setSuburbs] = useState([]);
 

  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        const res = await axios.get("/api/service/suburbs");
        if (res.data.suburbs && res.data.suburbs.length > 0) {
          setSuburbs(res.data.suburbs);

          
        }
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    };
    fetchSuburbs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-27 sm:mt-35 bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Service Areas</h1>
          <p className="text-lg opacity-90">
            We proudly serve many suburbs across Australia. Select any suburb to
            learn more.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - List of Suburbs */}
          <div className="lg:col-span-1 bg-white shadow-md rounded-xl p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" /> Suburbs We Serve
            </h2>
            <ul className="space-y-2">
              {suburbs.map((suburb, idx) => (
                <li key={idx}>
                  <Link
                    to={`/area-we-serve/${encodeURIComponent(suburb)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 rounded-lg cursor-pointer transition bg-gray-100 hover:bg-blue-100"
                  >
                    {suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - One Random Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-md bg-gray-200 flex items-center max-h-[600px] justify-center">
            
              <img
                src={"/demomap.png"}
                alt={"NAN"}
                className="w-full h-full object-cover"
              />
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AreasWeServe;
