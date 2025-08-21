import React, { useState } from "react";
import { useShopStore } from "../store/shopStore";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useNavigate } from "react-router-dom";
import LocationIQAutocomplete from "../components/LocationIQAutocomplete";

const Contactdetails = () => {
  const { selectedDate, selectedTime } = useShopStore();
  const navigate = useNavigate();

  dayjs.extend(advancedFormat);
  const formattedDate = dayjs(selectedDate).format("dddd, Do MMMM");

 

  const [formNew, setFormNew] = useState({
    address: "",
    suburb: "",
    postcode: "",
  });


 const handleAddressSelect = ({ fullAddress, suburb, postcode }) => {
    setFormNew({
      ...formNew,
      address: fullAddress,
      suburb,
      postcode,
    });
  }

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    console.log("Form data:", formNew);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Date & Time Display with Edit */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Fitting date & time:</h2>
        <button
          type="button"
          onClick={() => navigate("/shipping")} // navigate back to date selection page
          className="text-gray-800 underline hover:cursor-pointer text-sm"
        >
          Edit
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        {formattedDate} , <span>{selectedTime}</span>
      </p>
      <hr className="mb-4" />

      <h3 className="text-lg font-semibold mb-4">Your Information</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Phone */}
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <span className="flex items-center px-3 bg-gray-100 border-r border-gray-300">
            <img
              src="https://flagcdn.com/w20/au.png"
              alt="AU"
              className="w-5 h-5"
            />
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="px-3 py-2 w-full outline-none "
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />

        {/* Address */}
         <LocationIQAutocomplete onAddressSelect={handleAddressSelect} />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="flex items-center text-gray-600 hover:underline"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-md font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contactdetails;
