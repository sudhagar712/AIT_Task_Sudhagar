import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPostButton from "../Components/AddPostButton";
import axios from "axios";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/products");
        console.log(response.data);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen font-bold text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6">
      <h1 className="font-bold md:text-4xl text-xl text-blue-600">
        All Products Details
      </h1>
      <AddPostButton />
      <hr className="my-4 border-gray-300" />

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="overflow-x-auto p-4">
        <table className="table-auto border w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Sl.no</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Size</th>
              <th className="p-2">Color</th>
              <th className="p-2">Images</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">{indexOfFirstProduct + index + 1}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.size}</td>
                  <td className="p-2">{product.color}</td>
                  <td className="p-2">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`http://localhost:7000/${product.images?.[0]}`}
                        alt="Product"
                        className="w-12 h-12 object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    <Link to={`/productView/${product._id}`}>
                      <button className="px-2 py-1 text-white bg-blue-500 rounded">
                        View
                      </button>
                    </Link>
                    <button className="px-2 py-1 text-white bg-green-500 rounded">
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-2">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductForm;
