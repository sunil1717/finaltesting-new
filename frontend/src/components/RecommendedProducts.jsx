import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useShopStore } from '../store/shopStore';
import useAuthStore from '../store/authStore';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { StarIcon, BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import CartDrawer from "./CartDrawer";
import { Link } from "react-router-dom";


const RecommendedProducts = ({ tyres }) => {



  const getTyreKey = (tyre) => {
    const size = tyre.SIZE || `${tyre?.width}/${tyre?.profile}R${tyre?.rimSize}`;
    return `${tyre?.brand || tyre?.Brand}-${tyre?.model || tyre?.Model}-${size}`;
  };




  const navigate = useNavigate();
  const { addToCart, cart } = useShopStore();
  const { user } = useAuthStore();

  const [recommended, setRecommended] = useState([]);
  const [addedTyreKey, setAddedTyreKey] = useState(null);


  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedpriceoption, setselectedpriceoption] = useState({});

  const [openCardKey, setOpenCardKey] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const getRandomTyres = () => {
    if (!tyres || tyres.length === 0) return [];

    // Filter only in-stock tyres (handles "12+" or numeric values)
    const inStockTyres = tyres.filter(
      (tyre) => {
        const stockVal = String(tyre["In Stock"]).trim();
        return stockVal !== "" && stockVal !== "0" && stockVal.toLowerCase() !== "out of stock";
      }
    );

    if (inStockTyres.length === 0) return [];

    // Categories priority
    const categories = ["budget", "mid-range", "premium"];

    // Pick one random tyre from each available category in priority order
    let result = [];
    categories.forEach((cat) => {
      const tyresInCategory = inStockTyres.filter(
        (tyre) => tyre.category?.toLowerCase() === cat
      );
      if (tyresInCategory.length > 0) {
        const randomTyre = tyresInCategory[Math.floor(Math.random() * tyresInCategory.length)];
        result.push(randomTyre);
      }
    });

    return result;
  };




  useEffect(() => {
    setRecommended(getRandomTyres());
  }, [tyres]);

  const handleRefresh = () => {
    setRecommended(getRandomTyres());
  };

  const handleAddToCart = (tyre, price, quantity) => {

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
      rimSize: rimSize,
      brand: tyre.Brand,
      model: tyre.Model,
      rating: tyre["LOAD/SPEED RATING"],
      logo: tyre.brand_logo_url,
      image: tyre.image_url,
      price: price,
      "Price for 1": tyre["Price for 1"],
      "Price for 2": tyre["Price for 2"],
      "Price for 3": tyre["Price for 3"],
      "Price for 4": tyre["Price for 4"],
      "Price for 5": tyre["Price for 5"],
    };
    addToCart(newTyre, quantity);
    setIsCartOpen(true)

  }



  const categoryStyles = {
    "budget": {
      bg: "bg-green-800",
      text: "text-white",
      label: "Budget",
      icon: <BoltIcon className="w-5 h-5 text-white" />
    },
    "mid-range": {
      bg: "bg-yellow-500",
      text: "text-black",
      label: "Mid-Range",
      icon: <ShieldCheckIcon className="w-5 h-5 text-black" />
    },
    "premium": {
      bg: "bg-gray-700",
      text: "text-white",
      label: "Premium",
      icon: <StarIcon className="w-5 h-5 text-white" />
    }
  };



  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
    }),
  };

  if (!tyres || tyres.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recommended for You
          </motion.h2>
          <button
            onClick={handleRefresh}
            className="text-red-600 hover:underline text-sm font-medium hover:cursor-pointer"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((tyre, index) => {
            const tyreKey = getTyreKey(tyre);
            const isAlreadyInCart = cart.some((item) => getTyreKey(item) === tyreKey);

            const isOutofstock = Number(tyre["In Stock"]) === 0;

            const priceOptions = [
              { qty: 1, label: "1 Qty", price: tyre["Price for 1"] },
              { qty: 2, label: "2 Qty", price: tyre["Price for 2"] },
              { qty: 3, label: "3 Qty", price: tyre["Price for 3"] },
              { qty: 4, label: "4 Qty", price: tyre["Price for 4"] },
              { qty: 5, label: "5 Qty", price: tyre["Price for 5"] },
            ].filter(option => option.price != null);

            const selectedQty = selectedpriceoption[tyreKey];
            const selectedOption = priceOptions.find(option => option.qty === selectedQty);

            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                onClick={() => {
                  if (isMobile) {
                    setOpenCardKey((prevKey) => (prevKey === tyreKey ? null : tyreKey));
                  }
                }}
                viewport={{ once: true, amount: 0.2 }}
                className=" relative group overflow-hidden bg-gray-50 rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col items-center"
              >

                {/* Category ribbon */}
                {tyre.category && (
                  <div
                    className={`absolute top-0 left-0 w-full py-1 flex  items-center justify-center font-semibold ${categoryStyles[tyre.category.toLowerCase()]?.bg} ${categoryStyles[tyre.category.toLowerCase()]?.text}`}
                  >
                    {categoryStyles[tyre.category.toLowerCase()]?.icon}{categoryStyles[tyre.category.toLowerCase()]?.label}
                  </div>
                )}
                {/* Tyre logo Image */}

                {(
                  <img
                    src={tyre.brand_logo_url}
                    alt={`${tyre.Brand}`}
                    className="  h-30  w-45 object-contain mx-auto mix-blend-multiply mb-2"
                  />
                )}
                <h4 className="text-md font-bold text-gray-800 mb-1 text-center">
                  {tyre.Model}
                </h4>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {tyre.SIZE} ({tyre["LOAD/SPEED RATING"]})
                </p>

                {/* Tyre Image */}
                {tyre.image_url && (
                  <img
                    src={tyre.image_url}
                    alt={`${tyre.Brand} ${tyre.Model}`}
                    className="w-30 h-30 object-contain mx-auto mb-3"
                  />
                )}

                <p className='text-center mb-2 text-gray-600 text-sm'>From</p>

                <p className="text-2xl font-bold text-gray-800 text-center mb-1">
                  ${(tyre["Price for 4"]).toFixed(2)} ea
                </p>




                {
                  isMobile && (
                    <button className="w-full p-2 text-center text-red-400 underline" >Buy Now</button>
                  )
                }

                {/* Drop-up Hover Box */}
                {(
                  <div
                    className={`absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-xl border border-black/20 rounded-xl shadow-lg p-1 z-10 transition-all duration-300 ease-in-out transform
    ${isMobile
                        ? openCardKey === tyreKey
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-full opacity-0 pointer-events-none'
                        : 'group-hover:translate-y-0 group-hover:opacity-100 translate-y-full opacity-0'
                      }`}
                  >
                    <div onClick={(e) => e.stopPropagation()} className="space-y-0">
                      {isMobile && (
                        <button onClick={() => {

                          setOpenCardKey(null);

                        }}
                          className=' text-end text-gray-500'><ChevronDownIcon className="w-5 h-5" /></button>
                      )}
                      {priceOptions.map((option) => (
                        <label
                          key={option.qty}
                          className="flex items-center justify-between bg-gray-100 border border-gray-300   text-sm text-black/90 font-medium cursor-pointer px-3 py-2 mb-1 hover:bg-red-200 rounded-lg transition"
                        >
                          <div className="flex items-center gap-1">
                            {!isOutofstock && (<input
                              type="radio"
                              name={`price-option-recomended-${tyreKey}`}
                              value={option.qty}
                              checked={selectedpriceoption[tyreKey] === option.qty}
                              onChange={() =>
                                setselectedpriceoption((prev) => ({
                                  ...prev,
                                  [tyreKey]: option.qty,
                                }))
                              }
                              disabled={isOutofstock}
                              className="appearance-none w-4 h-4 border border-black rounded-lg bg-white/20 checked:bg-red-500 checked:border-gray-400 transition-all shadow-sm"
                            />)}
                            <span className={`${isOutofstock ? "line-through text-black/90 cursor-not-allowed" : "text-black/90"}`}>Qty {option.qty}</span>
                          </div>
                          <span className="text-black font-semibold">${option.price.toFixed(2)} ea</span>
                        </label>
                      ))}

                      {(




                        <button
                          onClick={() => {


                            handleAddToCart(tyre, selectedOption.price, selectedOption.qty);

                          }}

                          disabled={isAlreadyInCart || !selectedOption}
                          className={`w-full  ${isAlreadyInCart ? "bg-red-400 " : !selectedOption ? "bg-gray-400 " : " bg-red-500 hover:bg-red-600"}  text-white font-semibold py-2 rounded-lg shadow-md transition`}
                        >
                          {isAlreadyInCart ? "Already in Cart" : "Add to Cart "}
                        </button>




                      )}

                      {/* View Product button */}
                      <div className="flex items-center justify-center">
                        <a
                          href={`/product/${tyre.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 mb-2 text-red-600 underline"
                        >
                          View Product
                        </a>
                      </div>

                    </div>
                  </div>


                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </section>
  );
};

export default RecommendedProducts;
