import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useShopStore } from "../store/shopStore";


export default function OrderConfirmationPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {clearCart}= useShopStore();



  

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center"
          >
            <CheckCircle2 className="text-green-600 w-16 h-16 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Placed Successfully!
            </h2>

            <p className="text-gray-600 mb-2">
              Thank you for your booking. Our team will contact you shortly for confirmation and delivery details.
            </p>

            

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
