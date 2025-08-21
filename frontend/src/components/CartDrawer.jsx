import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShopStore } from "../store/shopStore";
import { ArrowLeft } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cart,
    fetchCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useShopStore();

  const navigate = useNavigate();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [animateOpen, setAnimateOpen] = useState(false);
  

   useEffect(() => {
    if (isOpen) {
      // small delay to trigger transition
      
      requestAnimationFrame(() => setAnimateOpen(true));
    } else {
      setAnimateOpen(false);
       
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const handleQuantityChange = (tyreId, newQty, tyre) => {
    if (newQty >= 1 && newQty <= 5) {
      const priceKey = `Price for ${newQty}`;
      const updatedPrice = tyre[priceKey] || tyre.price;

      setLoadingItemId(tyreId + 1);
      try {
        updateCartItem(tyreId, newQty, updatedPrice);
      } finally {
        setTimeout(() => setLoadingItemId(null), 400);
      }
    }
  };

  const handleRemoveItem = (tyreId) => {
    if (window.confirm("Remove this item from cart?")) {
      removeFromCart(tyreId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      clearCart();
    }
  };

  const total = (cart || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Desktop drawer (half from Right) */}
      <div
        className={`hidden md:block fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300
          w-1/2 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute  right-4 text-gray-600 hover:text-black text-2xl"
        >
          ✕
        </button>

        {loadingItemId && (
          <div className="w-full h-1 bg-gray-200 overflow-hidden mb-1">
            <div className="h-full bg-red-600 animate-progress"></div>
          </div>
        )}
        <div className="p-4 border-b mt-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Your Cart <span className="text-gray-500">({cart?.length || 0})</span>
          </h2>
          {cart?.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="border-b pb-4 mb-3 px-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-start">
                  <img
                    src={item.image}
                    alt=""
                    className="h-20 w-20 object-contain  rounded"
                  />
                  <div>
                    <img
                      src={item.logo}
                      alt={item.brand}
                      className="h-20 w-20 object-contain  rounded"
                    />
                    <p className="text-lg font-semibold text-gray-800">
                      {item.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.width}/{item.profile}R{item.rimSize} ( {item.rating} )
                    </p>
                    <p className="text-sm text-gray-500">
                      ${(item.price).toFixed(2)} x {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((num) => {
                        const isSelected = item.quantity === num;
                        return (
                          <button
                            key={num}
                            onClick={() =>
                              handleQuantityChange(index, num, item)
                            }
                            className={`w-8 h-8 rounded border text-sm font-semibold ${isSelected
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-800"
                              }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="ml-4 text-red-600 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
        <div className="border-t mt-6 pt-4 flex justify-between text-xl font-semibold px-4">
          <span>Total</span>
          <span className="text-red-500">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-center p-4">
          <button
            onClick={() => navigate("/shipping")}
            className="w-64 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-lg"
            disabled={cart.length === 0}
          >
            Proceed to Shipping
          </button>
        </div>
      </div>

      {/* Mobile drawer (half from bottom) */}
      {isOpen && (
        <div
          className={`block md:hidden fixed bottom-0 left-0 bg-white shadow-lg z-50 rounded-t-xl transition-transform duration-300
          w-full h-1/2 overflow-y-auto ${animateOpen ? "translate-y-0" : "translate-y-full"}
            `}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          >
            ✕
          </button>
          {/* Same cart UI reused */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Your Cart <span className="text-gray-500">({cart?.length || 0})</span>
            </h2>
            {cart?.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-600 hover:underline mt-10"
              >
                Clear Cart
              </button>
            )}
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="border-b pb-4 mb-3 px-4">
                {/* same item layout */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.image}
                      alt=""
                      className="h-20 w-20 object-contain border border-gray-300 rounded"
                    />
                    <div>
                      <img
                        src={item.logo}
                        alt={item.brand}
                        className="h-20 w-20 object-contain  rounded"
                      />
                      <p className="text-lg font-semibold text-gray-800">
                        {item.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.width}/{item.profile}R{item.rimSize} ( {item.rating} )
                      </p>
                      <p className="text-sm text-gray-500">
                        ${(item.price).toFixed(2)} x {item.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((num) => {
                          const isSelected = item.quantity === num;
                          return (
                            <button
                              key={num}
                              onClick={() =>
                                handleQuantityChange(index, num, item)
                              }
                              className={`w-8 h-8 rounded border text-sm font-semibold ${isSelected
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {num}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="ml-4 text-red-600 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="border-t mt-6 pt-4 flex justify-between text-xl font-semibold px-4">
            <span>Total</span>
            <span className="text-red-500">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-center p-4">
            <button
              onClick={() => navigate("/shipping")}
              className="w-64 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-lg"
              disabled={cart.length === 0}
            >
              Proceed to Shipping
            </button>
          </div>
        </div>
      
       )}

      <style>
        {`
  @keyframes progress {
    0% { transform: translateX(-100%); }

     
    100% { transform: translateX(100%); }
  }
  .animate-progress {
    animation: progress 0.8s ease-in-out infinite;
  }
`}
      </style>
    </>
  );
};

export default CartDrawer;
