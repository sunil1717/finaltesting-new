import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useShopStore } from "../store/shopStore";
import DateTimePicker from "../components/DateTimePicker";

const CartShipping = () => {
  const navigate = useNavigate();
  const { cart, fetchCart,selectedDate,selectedTime } = useShopStore();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 10;
  let total = subtotal + shipping;

  if(selectedTime ==="flexible"){
    total=total-10
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-28 sm:mt-40 bg-gray-50 p-4 sm:p-6 md:p-8">
        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-3 mb-10 text-sm sm:text-base">
          <div className="text-red-700 font-medium">1. Shopping Cart</div>
          <span className="text-gray-400">—</span>
          <div className="text-gray-400 font-semibold">2. Checkout</div>
          <span className="text-gray-400">—</span>
          <div className="text-gray-400">3. Order Complete</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Shipping Summary */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm  p-5">
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">
              Shipping Summary
            </h2>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4 last:border-none">
                  <div className="flex gap-4 items-start">


                    <img
                      src={item.image}
                      alt=""
                      className="h-20 w-20 object-contain  rounded"
                    />

                    <div >

                      <img
                        src={item.logo}
                        alt={item.brand}
                        className="h-20 w-20 object-contain  rounded"
                      />

                      <p className="font-medium text-gray-800">
                        {item.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.width}/{item.profile}R{item.rimSize}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800 text-lg">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Time Picker */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-400 p-5">
              <h3 className="text-lg  font-semibold mb-4">Select Delivery Slot :</h3>
              <DateTimePicker />
            </div>

            {/* Right - Price Summary */}
            <div className="bg-white border border-gray-400 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {selectedTime === "flexible" && (
                  <div className="flex justify-between bg-red-300">
                  <span>Discount</span>
                  <span>$10.00</span>
                </div>
                )}
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout", { state:total })}
                disabled={!selectedDate || !selectedTime }
                className={`mt-6 w-full ${ selectedTime?"bg-red-600 hover:bg-red-700":"bg-gray-500"}  transition-colors text-white font-bold py-3 rounded-full`}
              >
                 {selectedTime ? "Continue to Checkout" :"Select Delivery Slot"} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartShipping;
