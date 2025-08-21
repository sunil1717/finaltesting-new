import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShopStore } from "../store/shopStore";


const faqs = [
  {
    question: "How does mobile tyre fitting work?",
    answer: "We come to your location with our fully equipped van and fit your tyres on the spot."
  },
  {
    question: "Is mobile tyre fitting more expensive than traditional tyre shops?",
    answer: "No, our prices are competitive with traditional tyre shops, plus you save time and convenience."
  },
  {
    question: "How long will it take to change my tyres?",
    answer: "It usually takes around 30–45 minutes per tyre depending on your vehicle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major debit/credit cards, mobile payments, and cash."
  },
  {
    question: "Are there any extra costs?",
    answer: "No hidden charges. The price you see includes fitting, balancing, and disposal of old tyres."
  },
  {
    question: "Do you provide warranty on your services?",
    answer: "Yes, all our tyres come with a manufacturer’s warranty and we guarantee our fitting service."
  },
  {
    question: "How quickly can you come to fit my tyres?",
    answer: "We can usually offer same-day or next-day appointments depending on availability."
  },
  {
    question: "How much space do we require to fit your tyres?",
    answer: "A safe parking space with enough room around the car is sufficient."
  },
  {
    question: "How do I know if I need new tyres?",
    answer: "If tread depth is below 1.6mm, tyres are damaged, or grip feels reduced, it's time for replacement."
  },
  {
    question: "What if I'm not sure about my tyre size?",
    answer: "You can provide your registration number or check the markings on your tyre sidewall."
  }
];

const ProductSingle = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const {
    cart,
    addToCart
  } = useShopStore();

  const { slug } = useParams();
  const [tyre, setTyre] = useState(null);
  const [selected, setSelected] = useState(4);

  useEffect(() => {
    const fetchTyre = async () => {
      try {
        const res = await axios.get(`/api/tyreall/fetch/${slug}`);
        setTyre(res.data);
      } catch (err) {
        console.error("Error fetching tyre:", err);
      }
    };
    fetchTyre();
  }, [slug]);

  const getTyreKey = (tyre) => {
    const size = tyre.SIZE || `${tyre?.width}/${tyre?.profile}R${tyre?.rimSize}`;
    return `${tyre?.brand || tyre?.Brand}-${tyre?.model || tyre?.Model}-${size}`;
  };

  if (!tyre) return <p className="text-center mt-10">Loading...</p>;

  const tyreKey = getTyreKey(tyre);
  const isOutOfStock = Number(tyre["In Stock"]) === 0;
  const isAlreadyInCart = cart.some(
    (item) => getTyreKey(item) === tyreKey
  );

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      // Pick correct price field based on selected quantity
      const priceField = `Price for ${selected}`;
      const price = tyre[priceField] || tyre["Price Incl GST"];

      let width = '', profile = '', rimSize = '';
      if (tyre.SIZE && typeof tyre.SIZE === 'string') {
        const match = tyre.SIZE.match(/^(\d{3})\/(\d{2})R(\d{2})$/);
        if (match) {
          [, width, profile, rimSize] = match;
        }
      }

      const newTyre = {
        width: Number(width),
        profile: Number(profile),
        rimSize,
        brand: tyre.Brand,
        model: tyre.Model,
        rating: tyre["LOAD/SPEED RATING"],
        logo: tyre.brand_logo_url,
        image: tyre.image_url,
        price,
        "Price for 1": tyre["Price for 1"],
        "Price for 2": tyre["Price for 2"],
        "Price for 3": tyre["Price for 3"],
        "Price for 4": tyre["Price for 4"],
        "Price for 5": tyre["Price for 5"],
      };

      addToCart(newTyre, selected);
    }
  };


  

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-25 sm:mt-35 bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto   overflow-hidden md:flex">

          {/* Left - Image */}
          <div className="flex-shrink-0 border border-gray-300 flex items-center justify-center p-2 md:p-6 w-full md:w-1/2">
            <img
              src={tyre.image_url}
              alt={tyre.Model}
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>

          {/* Right - Scrollable Details */}
          <div className="w-full md:w-1/2 pl-10 overflow-y-auto max-h-[80vh]">
            <img
              src={tyre.brand_logo_url}
              alt={tyre.Brand}
              className="h-12 w-auto object-contain mb-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {tyre.Model}
            </h1>
            <p className="text-gray-800 font-medium mb-4">
              Size: {tyre.SIZE} ({tyre["LOAD/SPEED RATING"]})
            </p>

            {isOutOfStock && <p className="text-red-500">Out Of Stock</p>}


            <p className="mt-2 mb-2 text-gray-800 font-medium">Select Quantity</p>

            {/* Quantity buttons */}
            <div className="grid grid-cols-5 gap-2 w-full">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = selected === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelected(num)}
                    className={`sm:w-25 h-15 w-15   rounded border border-gray-400 text-sm font-semibold hover:cursor-pointer ${isSelected
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>


            <div className="flex justify-between items-start mt-5">
              <p className="text-gray-800 text-2xl font-medium">${(tyre[`Price for ${selected}`]).toFixed(2)} ea</p>
              <div className="flex flex-col items-end">
                <p className="font-medium">Total cost <span className="text-gray-500">(inc. GST)</span></p>
                <p className="font-bold text-4xl">${(tyre[`Price for ${selected}`] * selected).toFixed(2)}</p>
              </div>
            </div>




            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`mt-6 w-full py-3 rounded-lg font-semibold hover:cursor-pointer transition ${isOutOfStock ? "bg-gray-400" : "bg-red-600"}`}
            >
              {
                isOutOfStock ? " Out Of Stock" : "Add To Cart"
              }
            </button>

            {/*FAQ-------------------------------*/}


            <div className="max-w-2xl mt-10 mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">FAQs</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b py-3">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center font-medium"
                >
                  {faq.question}
                  <span>{activeIndex === index ? "-" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
          </div>

          

          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductSingle;
