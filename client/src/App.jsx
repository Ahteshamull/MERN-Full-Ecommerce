import React, { useEffect } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Changed from "react-router" to "react-router-dom"
import Home from "./pages/Home";
import Card from "./pages/Card";
import Layout from "./layout/Layout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SIgnup from "./pages/SIgnup";
import ForgotPass from "./pages/ForgotPass";
import Context from "./context"; // Assuming this is your context setup
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { setUser } from "./store/userSlices";
import AllUsers from "./pages/AllUsers";
import AdminPanel from "./pages/AdminPanel";

import Dashboard from "./components/Dashboard";
import AllProducts from "./pages/AllProducts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SIgnup />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route index element={<Dashboard />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-products" element={<AllProducts />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/user-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const dataApi = await response.json();
      if (dataApi.success) {
        dispatch(setUser(dataApi.data));
      }
    
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

export default App;
