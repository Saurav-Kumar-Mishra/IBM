import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import HomeLayout from "./layouts/Home";
import Auth from "./layouts/Auth";
import Seller from "./layouts/Seller";

import Home from "./pages/LandingPage"
import Products from "./pages/Products"
import ViewProduct from "./pages/ViewProduct"
import Cart from "./pages/Cart"
import MyOrders from "./pages/Orders"
import Profile from "./pages/Profile"

import Dashboard from "./pages/seller/Dashboard"
import AddProduct from "./pages/seller/AddProduct"

import Login from "./pages/auth.js/Login"
import Register from "./pages/auth.js/Register"
import UpdatePassword from "./pages/auth.js/UpdatePassword"
import SendEmailVerificationLink from "./pages/auth.js/SendEmailVerificationLink"

import Error from "./pages/Error";

import './App.css';
import { useDispatch } from "react-redux";
import {initializeUser} from "./slices/user";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      dispatch(initializeUser(user));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view/:id" element={<ViewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/seller/" element={<Seller />}>
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="addProduct/" element={<AddProduct />} />
        </Route>

        <Route path="/auth/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="register/" element={<Register />} />
          <Route path="updatePassword/" element={<UpdatePassword />} />
          <Route path="verifyEmail/" element={<SendEmailVerificationLink />} />
        </Route>

        <Route path="/error" element={<Error />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
