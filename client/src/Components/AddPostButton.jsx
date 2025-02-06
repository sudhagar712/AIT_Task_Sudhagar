import React, { useState } from "react";
import axios from "axios";

const AddPostButton = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    size: "",
    color: "",
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files : value, 
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:7000/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");

      // Close the modal after submission
      document.getElementById("my_modal_3").close();

      // Reset form after submission
      setFormData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        size: "",
        color: "",
        images: null,
      });
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <div className="mt-5 mb-10 text-right">
      <button
        className="btn btn-outline btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Post +
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-500"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
          </form>

          {/* Post Form */}
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-green-500 mb-4 text-center">
                Add New Product
              </h2>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="input-field"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="input-field h-24 resize-none"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      className="input-field"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Size</label>
                    <input
                      type="text"
                      name="size"
                      className="input-field"
                      placeholder="Enter size"
                      value={formData.size}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Color</label>
                    <input
                      type="text"
                      name="color"
                      className="input-field"
                      placeholder="Enter color"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Images</label>
                    <input
                      type="file"
                      name="images"
                      className="input-field"
                      multiple // Allow multiple image uploads
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-5 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPostButton;
