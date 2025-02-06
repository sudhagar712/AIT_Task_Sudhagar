import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/products/${productId}`
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] font-bold text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-center">
          <img
            src={`http://localhost:7000/${product.images[0]}`}
            alt="Product Image"
            className="object-cover h-96 w-full"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-4 space-y-2">
            <p className="text-lg text-gray-800">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Size:</strong> {product.size}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Color:</strong> {product.color}
            </p>
          </div>

          <div className="mt-6">
            <strong className="text-xl text-gray-800">Images:</strong>
            <div className="flex space-x-2 mt-2">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:7000/${image}`}
                    alt={`Product Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
