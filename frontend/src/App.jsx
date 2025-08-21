import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartShipping from "./pages/CartShipping"
import { useEffect } from 'react';
// import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import OrderComplete from "./pages/OrderComplete";
// import LoginPage from "./pages/LoginPage"
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from "./pages/AdminDashboard"

import AdminProtectedRoute from './components/AdminProtectedRoute';

import BlogDetailPage from './pages/BlogDetailPage';
// import MyBookings from './pages/MyBookings';
import AllBlogs from './pages/AllBlogs'; 



import AOS from 'aos';
import 'aos/dist/aos.css';

import { ConfirmProvider } from './components/ConfirmDialog';
import TearmCondition from "./pages/TearmCondition"
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import HelpCenter from './pages/HelpCenter';


import Fleet from "./pages/services/Fleet"
import Tyresales from "./pages/services/Tyresales"
import Rotations from "./pages/services/Rotations"
import Onsitefitting from "./pages/services/Onsitefitting"
import Puncturerepair from "./pages/services/Puncturerepair"
import Recycling from "./pages/services/Recycling"
import Wheelbalancing from "./pages/services/Wheelbalancing"
import Inspections from "./pages/services/Inspections"








export default function App() {
  useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
}, []);
  return (
     <ConfirmProvider>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      {/* <Route path="/cart" element={<Cart />} /> */}
      <Route path="/shipping" element={<CartShipping />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order" element={<OrderComplete />} />
      {/* <Route path="/login/user" element={<LoginPage />} /> */}
      <Route path="/login/admin" element={<AdminLogin />} />
      
      <Route path="*" element={<HomePage/>} />
      <Route path="/blogs" element={<AllBlogs />} />
       <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/terms" element={<TearmCondition/>} />

      <Route path="/about-us" element={<AboutUs/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/help-center" element={<HelpCenter/>} />


      {/* All Services Route*/}

      <Route path="/services/fleet" element={<Fleet/>} />
      <Route path="/services/tyre-sales" element={<Tyresales/>} />
      <Route path="/services/onsite-fitting" element={<Onsitefitting/>} />
      <Route path="/services/puncture-repair" element={<Puncturerepair/>} />
      <Route path="/services/rotations" element={<Rotations/>} />
      <Route path="/services/wheel-balancing" element={<Wheelbalancing/>} />
      <Route path="/services/inspections" element={<Inspections/>} />
      <Route path="/services/recycling" element={<Recycling/>} />














      {/* <Route path="/mybooking" element={<MyBookings />} /> */}


      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />







    </Routes>
    </ConfirmProvider>

  );
}
