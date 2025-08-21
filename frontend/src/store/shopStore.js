import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

//  Helpers for DATE and TIME SAVE

const getLocalDateTime = () => {
  const stored = localStorage.getItem("selectedDateTime");
  return stored ? JSON.parse(stored) : { date: null, time: null };
};

const saveLocalDateTime = (date, time) => {
  localStorage.setItem(
    "selectedDateTime",
    JSON.stringify({ date, time })
  );
};

// ===== LocalStorage Cart Helpers =====
const getLocalCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


export const useShopStore = create((set, get) => ({
  tyres: [],
  cart: [],
  bookings: [],
  serviceable: false,
  loading: false,
  error:null,
  errorCoupon: null,
  selectedDate: getLocalDateTime().date,
  selectedTime: getLocalDateTime().time,

  discount: 0,    // discount value after applying coupon
  couponMessage: "",
  finalAmount: 0,
  coupons: [],
  appliedCoupon:null,




  //Coupon functions ------------------
  // Fetch all coupons
  fetchCoupons: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${BASE_URL}/coupons/all`);
      set({ coupons: res.data.coupons, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch coupons", loading: false });
    }
  },
  // Add new coupon (Admin only)
  addCoupon: async (couponData) => {
    try {
      const res = await axios.post(`${BASE_URL}/coupons/add`, couponData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      set((state) => ({ coupons: [...state.coupons, res.data.coupon] }));
      return res.data;
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to add coupon" };
    }
  },

  // Apply coupon
  applyCoupon: async (code, totalAmount) => {
    try {
      const res = await axios.post(`${BASE_URL}/coupons/apply`, { code, totalAmount });
      set({
        appliedCoupon: code,
        discount: res.data.discount,
        finalAmount: res.data.finalAmount,
        errorCoupon: null,
      });
      return res.data;
    } catch (err) {
      set({ errorCoupon: err.response?.data?.message || "Coupon not valid" });
      return { success: false, message: err.response?.data?.message || "Coupon not valid" };
    }
  },

  removeCoupon: () => {
  set({
    appliedCoupon: null,
    discount: 0,
    finalAmount: null,
    errorCoupon: null,
  });
},

  // Delete coupon (Admin only)
  deleteCoupon: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/coupons/delete/${id}`);
      set((state) => ({ coupons: state.coupons.filter((c) => c._id !== id) }));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to delete coupon" };
    }
  },








  // --- Setters for date/time ---
  setSelectedDate: (date) => {
    saveLocalDateTime(date, get().selectedTime);
    set({ selectedDate: date });
  },
  setSelectedTime: (time) => {
    saveLocalDateTime(get().selectedDate, time);
    set({ selectedTime: time });
  },



  //  Fetch all tyres
  fetchTyres: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${BASE_URL}/tyres/getall`);
      set({ tyres: res.data.data });
    } catch (err) {
      set({ error: 'Failed to fetch tyres' });
    } finally {
      set({ loading: false });
    }
  },

  //  Check service area by postcode and suburb
  checkServiceArea: async (postcode, suburb) => {
    try {
      const res = await axios.post(`${BASE_URL}/service/check`, {
        postcode,
        suburb
      });
      set({ serviceable: res.data.isServiceable });
      return res.data.isServiceable;
    } catch (err) {
      set({ error: 'Failed to check service area' });
      return false;
    }
  },


  // Fetch cart from localStorage
  fetchCart: () => {
    const localCart = getLocalCart();
    set({ cart: localCart });
  },

  // Add item to cart
  addToCart: (tyre, quantity) => {
    let cart = getLocalCart();

    // Check if tyre already exists (based on unique keys)
    const existingIndex = cart.findIndex(
      (item) =>
        item.width === tyre.width &&
        item.profile === tyre.profile &&
        item.rimSize === tyre.rimSize &&
        item.brand === tyre.brand &&
        item.model === tyre.model
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = quantity;
      cart[existingIndex].price = tyre.price;


    } else {
      cart.push({ ...tyre, quantity });
    }

    saveLocalCart(cart);
    set({ cart });
  },

  // Update cart item quantity
  updateCartItem: (index, quantity, updatedPrice) => {
    let cart = getLocalCart();
    if (cart[index]) {
      cart[index].quantity = quantity;
      if (updatedPrice !== undefined) {
        cart[index].price = updatedPrice;
      }
    }
    saveLocalCart(cart);
    set({ cart });
  },

  // Remove item from cart
  removeFromCart: (index) => {
    let cart = getLocalCart();
    cart.splice(index, 1);
    saveLocalCart(cart);
    set({ cart });
  },

  // Clear cart
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },


  //booking ----------------------------------

  createBooking: async ({ address, paymentMethod }) => {
    try {
      const user = useAuthStore.getState().user;
      const cart = get().cart;

      if (!user || !user._id || !user.phone) {
        alert("Please login first");
        return;
      }

      // Loop through cart items and create individual bookings
      for (let item of cart) {
        await axios.post(`${BASE_URL}/bookings/create`, {
          user: user._id,
          phone: user.phone,
          tyre: item.tyre, //  send full tyre object
          quantity: item.quantity,
          address,
          paymentMethod: paymentMethod || "CashOnDelivery"
        });
      }

      await get().fetchBookings();
      await get().clearCart();
    } catch (err) {
      console.error("Booking failed:", err);
      set({ error: "Failed to create booking" });
    }
  },



  fetchBookings: async () => {
    try {
      const user = useAuthStore.getState().user;
      if (!user || !user.phone) return;

      const res = await axios.get(`${BASE_URL}/bookings/user?phone=${user.phone}`);
      set({ bookings: res.data });
    } catch (err) {
      console.error("Fetching bookings failed:", err);
      set({ error: "Failed to fetch bookings" });
    }
  },

  // =================== DRD FUNCTIONS ===================


  // 1. 🔍 Search by Rego + State
  searchByRego: async ({ rego, state }) => {
    try {
      const res = await axios.post(`${BASE_URL}/drd/search-by-rego`, { rego, state });

      if (res.data.multipleMatches) {
        // Multiple vehicle variants
        return {
          multipleMatches: true,
          variantCount: res.data.variantCount,
          variants: res.data.matchedTyres || [],
          vehicleMake: res.data.vehicleMake // Optional: add vehicleKeys or model names here
        };
      } else {
        // Single vehicle match — return full matched tyre list, not just first tyre
        return {
          multipleMatches: false,
          vehicle: res.data.vehicle || null,
          fitment: res.data.fitment || null,
          matchedTyres: res.data.matchedTyres || [], // return full array
        };
      }
    } catch (err) {
      console.error('Failed to search by rego/state:', err);
      return { error: 'Search failed' };
    }
  },






  // 3. 📏 Search Tyre by Size
  searchBySize: async ({ width, profile, rimSize }) => {
    try {
      const res = await axios.post(`${BASE_URL}/tyreall/size`, {
        width,
        profile,
        rim: rimSize,
      });
      return res.data;
    } catch (err) {
      console.error('Tyre size search failed:', err);
      return { error: 'No tyres found or error occurred' };
    }
  },

}));
