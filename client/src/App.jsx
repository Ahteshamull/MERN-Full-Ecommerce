import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import Card from "./pages/Card";
import Layout from "./layout/Layout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SIgnup from "./pages/SIgnup";
import ForgotPass from "./pages/ForgotPass";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SIgnup />}></Route>
        <Route path="/forgot-pass" element={<ForgotPass />}></Route>
      </Route>
    </>
  )
);

const App = () => {


  return <RouterProvider router={router} />;
};

export default App;
