import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPostButton from "../Components/AddPostButton";
import axios from "axios";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/products");
        console.log(response.data);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/products/${id}`
      );
      console.log("Product deleted:", response.data);

     
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] font-bold text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6">
      <AddPostButton />
      <hr className="text-white shadow-xl" />

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
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="border-b">
                  <th className="p-2">{index + 1}</th>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.size}</td>
                  <td className="p-2">{product.color}</td>
                  <td className="p-2">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`http://localhost:7000/${product.images[0]}`}
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
    </div>
  );
};

export default ProductForm;
