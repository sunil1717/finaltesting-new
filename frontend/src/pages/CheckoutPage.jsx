import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useShopStore } from "../store/shopStore";


import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LocationIQAutocomplete from "../components/LocationIQAutocomplete";


import Navbar from "../components/Navbar";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
import Contactdetails from "../components/Contactdetails";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { FaTimes } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

import axios from "../utils/axiosInstance";

import OrderConfirmationPopup from "../components/OrderConfirmationPopup";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state;

  const [showPopup, setShowPopup] = useState(false);

  const { cart,
    createBooking,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    discount,
    finalAmount,
    errorCoupon,
    selectedDate,
    selectedTime,
    checkServiceArea,
    clearCart,
  } = useShopStore();


  //contact details setup --------
  dayjs.extend(advancedFormat);
  const formattedDate = dayjs(selectedDate).format("dddd, Do MMMM");


  const [serviceable, setServiceable] = useState(null);

  const [formNew, setFormNew] = useState({
    address: "",
    suburb: "",
    postcode: "",
  });
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleAddressSelect = async (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...formNew, [name]: value };

    setFormNew(updatedForm);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }




    setTypingTimeout(
      setTimeout(async () => {





        console.log(updatedForm.postcode, updatedForm.suburb);

        if (!updatedForm.postcode.trim() || !updatedForm.suburb.trim()) return;
        const isServiceable = await checkServiceArea(updatedForm.postcode.trim(), updatedForm.suburb.trim());

        console.log(isServiceable);

        setServiceable(isServiceable);
      }, 500))
  }

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

  });


  const handleChangeCon = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitCon = (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    console.log("Form data:", formNew);
  };






  //------------------------------------------------------------



  const [couponInput, setCouponInput] = useState("");

  const [selectedTyres, setSelectedTyres] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({

    vehicleDetails: "WARIS4",
    state: "VIC",
    colour: "",
    make: "Toyota",
    model: "Camry",
  });


  useEffect(() => {
    if (cart.length === 0) {
      navigate("/shipping");
    }
  }, [cart, navigate]);




  const handleApply = async () => {
    await applyCoupon(couponInput, total);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const tyres = [
    { id: "frontLeft", label: "Front Left", position: "top-[60px] left-[40px]" },
    { id: "frontRight", label: "Front Right", position: "top-[60px] right-[40px]" },
    { id: "rearLeft", label: "Rear Left", position: "bottom-[60px] left-[40px]" },
    { id: "rearRight", label: "Rear Right", position: "bottom-[60px] right-[40px]" },
    { id: "spare", label: "Spare", position: "bottom-[-20px] left-1/2 -translate-x-1/2" },
  ];

  const toggleTyre = (id) => {
    setSelectedTyres((prev) =>
      prev.includes(id) ? prev.filter((tyre) => tyre !== id) : [...prev, id]
    );
  };






  //total quantity calculation--------

  const totalQuantity = cart.reduce((acc, item) => {
    const qty = parseInt(item.quantity) || 1;
    return acc + qty;
  }, 0);

  const stripeAmount = Math.round((finalAmount || total) * 100);


  const validateForm = () => {

    if (!formattedDate || !selectedTime) {
      setErrorMessage("Please enter First Time and Date Slot");
      return false;
    }
    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      setErrorMessage("Please fill in all contact details.");
      return false;
    }

    if (!formNew.address || !formNew.suburb || !formNew.postcode) {
      setErrorMessage("Please enter a valid address.");
      return false;
    }

    if (!serviceable) {
      setErrorMessage("Sorry, we cannot deliver to this address.");
      return false;
    }

    if (!formData.vehicleDetails || !formData.make || !formData.model) {
      setErrorMessage("Please fill in your vehicle details.");
      return false;
    }

    if (totalQuantity <= 5 && selectedTyres.length !== totalQuantity) {
      setErrorMessage(`Please select exactly ${totalQuantity} tyres.`);
      return false;
    }

    if (!isTermsAccepted) {
      setErrorMessage("You must accept the Terms & Conditions.");
      return false;
    }

    setErrorMessage(""); // clear any old errors
    return true;
  };



  return (
    <>
      <Navbar />

      {/* Progress Bar */}
      <div className="flex justify-center items-center space-x-3 mt-28 p-4 sm:mt-45 mb-8">
        <div className="text-red-700 font-medium">1. Shopping Cart</div>
        <span className="text-gray-400">—</span>
        <div className="text-red-700 font-medium">2. Checkout</div>
        <span className="text-gray-400">—</span>
        <div className="text-gray-400">3. Order Complete</div>
      </div>




      <div className="min-h-screen max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">



        {/* LEFT COLUMN */}
        <div className="space-y-6">

          <button className="flex flex-cols hover:cursor-pointer bg-red-600 text-white py-2 px-1 rounded-2xl" onClick={() => navigate("/shipping")}><ArrowLeft /><span>Back to Shipping</span></button>



          {/* Vehicle Form ------------------------------------------------*/}

          <form

            className="max-w-2xl mx-auto bg-white p-6 rounded shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vehicle details */}
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle No</label>
                <input
                  type="text"
                  name="vehicleDetails"
                  value={formData.vehicleDetails}
                  onChange={handleChange}
                  className="w-full border rounded p-2 border-gray-300"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded p-2 border-gray-300"
                >
                  <option value="VIC">VIC</option>
                  <option value="NSW">NSW</option>
                  <option value="QLD">QLD</option>
                  <option value="SA">SA</option>
                  <option value="WA">WA</option>
                  <option value="TAS">TAS</option>
                  <option value="NT">NT</option>
                  <option value="ACT">ACT</option>
                </select>
              </div>

              {/* Colour */}
              <div>
                <label className="block text-sm font-medium mb-1">Colour</label>
                <input
                  type="text"
                  name="colour"
                  placeholder="Colour"
                  value={formData.colour}
                  onChange={handleChange}
                  className="w-full border rounded p-2 border-gray-300"
                />
              </div>

              {/* Make */}
              <div>
                <label className="block text-sm font-medium mb-1">Make</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full border rounded p-2 border-gray-300"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full border rounded p-2 border-gray-300"
                />
              </div>
            </div>


          </form>

          {/* Car Image for tyre select -----------------------------------------------*/}

          {totalQuantity <= 5 && <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">
              Please select tyres to be replaced
            </h2>
            <p className="text-gray-600 mb-6">
              Tell our technician which tyres to replace, Plz select{" "}
              <span className="font-bold">{totalQuantity} Tyres</span> below
            </p>

            <div className="relative w-[360px]">
              {/* Car Top View Sketch */}
              <img
                src="/car_image.png" // replace with your uploaded car sketch
                alt="Car Outline"
                className="w-full rotate-270 "
              />

              {tyres.map((tyre) => (
                <label
                  key={tyre.id}
                  className={`absolute ${tyre.position} flex flex-col items-center cursor-pointer`}
                >
                  {/* Round Button */}
                  <input
                    type="checkbox"
                    value={tyre.id}

                    checked={selectedTyres.includes(tyre.id)}
                    onChange={() => toggleTyre(tyre.id)}
                    className="hidden"
                  />
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center
                ${selectedTyres.includes(tyre.id) ? "bg-red-500 border-red-500" : "border-gray-400"}`}
                  >
                    {selectedTyres.includes(tyre.id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs mt-1">{tyre.label}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              {
                selectedTyres.length > totalQuantity && <span className="text-red-500"> Exceed From Quantity</span>
              }

            </div>
          </div>

          }




        </div>


        {/* RIGHT COLUMN ***************************************************************************************** */}
        <div className="space-y-6">
          {/* Contact Details------------------------------------------------------------ */}
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

            <form className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChangeCon}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChangeCon}
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
                  onChange={handleChangeCon}
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
                onChange={handleChangeCon}
                required
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />

              {/* Address */}
              {/* <LocationIQAutocomplete onAddressSelect={handleAddressSelect} /> */}

              <div className="w-full px-3 py-2">
                {/* Full Address */}
                <div>
                  <label className="block font-medium mb-1">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formNew.address}
                    onChange={handleAddressSelect}
                    className="w-full border border-gray-300 py-2 px-3 rounded-md"
                    placeholder="Enter your full address"
                  />
                </div>

                {/* Suburb + Postcode in one row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Suburb</label>
                    <input
                      type="text"
                      name="suburb"
                      value={formNew.suburb}
                      onChange={handleAddressSelect}
                      className="w-full border border-gray-300 py-2 px-3 rounded-md"
                      placeholder="Enter suburb"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formNew.postcode}
                      onChange={handleAddressSelect}
                      className="w-full border border-gray-300 py-2 px-3 rounded-md"
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>
              </div>

              {
                 formNew.postcode && !serviceable && <span className="text-red-500">Sorry We Can't deliver to this Address Till now </span>
              }



            </form>
          </div>


          {/* Total Amount -------------------------------------------*/}
          <div className="bg-white p-4 shadow rounded">

            <div className="space-y-4">
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total Amount:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/*Coupon Form-------------------------------------------------------- */}
          {/* Coupon input */}
          {!appliedCoupon ? (
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 border border-gray-500 rounded px-2 py-1"
              />
              <button
                onClick={handleApply}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-green-50 border px-3 py-1 rounded mb-2">
              <span className="text-green-700 font-medium">
                Coupon <b>{appliedCoupon}</b> applied – You saved ${(discount).toFixed(2)}
              </span>
              <button
                onClick={removeCoupon}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Error */}
          {errorCoupon && <p className="text-red-500 text-sm">{errorCoupon}</p>}

          {/* Final total */}
          <p className="mt-4 font-bold text-lg">
            Final Total: ${(finalAmount || total).toFixed(2)}
          </p>


          {/* Terms & Conditions --------------------*/}

          <div className="bg-white p-4 shadow rounded">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Terms & Conditions
                </a>.
              </span>
            </label>
          </div>


          {/* -----------------------------------------Stripe Payment--------------------------------------- */}

          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            {errorMessage && (
              <p className="text-red-600 text-sm font-medium mb-2">{errorMessage}</p>
            )}
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm
                amount={stripeAmount} // in cents

                bookingData={{
                  cart,
                  form,
                  formNew,
                  formData,
                  selectedTyres,
                  selectedDate,
                  selectedTime,
                  total,
                  finalAmount,
                  appliedCoupon,
                }}

                validateForm={validateForm}

                onSuccess={async (bookingPayload) => {
                  try {
                    await axios.post("/api/booking/confirm", bookingPayload);



                    setShowPopup(true);

                  } catch (err) {
                    console.error("Error sending booking to backend", err);
                  }
                }}
              />
            </Elements>

          </div>
        </div>
      </div>

      {/* Confirmation popup */}
      <OrderConfirmationPopup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          clearCart()

        }}

      />
    </>
  );
};

export default CheckoutPage;
