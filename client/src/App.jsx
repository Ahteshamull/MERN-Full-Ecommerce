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
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/card" element={<Card />}></Route>
      </Route>
    </>
  )
);

const App = () => {


  return <RouterProvider router={router} />;
};

export default App;
