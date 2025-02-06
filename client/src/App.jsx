import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import ProductForm from "./pages/ProductForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<ProductForm />} />
          <Route
            path="/productView/:productId"
            element={<ProductView />}
          />{" "}
          {/* Fixed Route */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
