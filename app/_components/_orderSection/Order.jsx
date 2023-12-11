"use client";
import React, { useEffect, useState } from "react";
import Container from "../_container/Container";
import { AiOutlineShoppingCart, AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";
import { IoTrash, IoAddSharp, IoRemoveSharp } from "react-icons/io5";

const Order = () => {
  // get all product functionality
  let [allProduct, setAllProduct] = useState([]);

  const headers = {
    Authorization: "gmpro12@",
  };

  useEffect(() => {
    axios
      .get(
        "https://goodmorning-aid-backend.onrender.com/api/v1/products/allproducts",
        { headers }
      )
      .then((response) => {
        setAllProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // card functionality
  let [sidebarCartShow, setSidebarCartShow] = useState(false);
  let [cartArray, setCartArray] = useState([]);
  // add cart
  const handleCart = (id) => {
    // Check if the product ID is already in the cartArray
    if (!cartArray.includes(id)) {
      // If not, add the ID to the cartArray
      setCartArray([...cartArray, id]);
    }
    console.log(cartArray);
  };
  // delete cart
  const handleDelete = (id) => {
    // Check if the product ID is in the cartArray
    if (cartArray.includes(id)) {
      // If it is, remove the ID from the cartArray
      setCartArray(cartArray.filter((productId) => productId !== id));
    }
  };

  // product increase decrease management
  const [productQuantities, setProductQuantities] = useState({});

  const handleIncrease = (id) => {
    // Find the current quantity for the product
    const currentQuantity = productQuantities[id] || 0;

    // Update the quantity in the state
    setProductQuantities({
      ...productQuantities,
      [id]: currentQuantity + 1,
    });
  };

  const handleDecrease = (id) => {
    // Find the current quantity for the product
    const currentQuantity = productQuantities[id] || 0;

    // Ensure the quantity doesn't go below 1
    if (currentQuantity > 1) {
      // Update the quantity in the state
      setProductQuantities({
        ...productQuantities,
        [id]: currentQuantity - 1,
      });
    }
  };

  // Confirm order functionality
  const handleConfirmOrder = () => {
    // Create an array to store ordered products
    const orderedProducts = [];

    // Calculate the total amount
    let totalAllProductAmount = 0;

    // Loop through the cartArray to gather product details
    cartArray.forEach((productId) => {
      const product = allProduct.find((p) => p._id === productId);
      const productQuantity = productQuantities[productId] || 0;

      // Calculate the total amount for the current product
      const totalAmount = product.price * productQuantity;

      // Add the current product to the orderedProducts array
      orderedProducts.push({
        name: product.name,
        quantity: productQuantity,
        productImageUrl: product.image,
        totalAmount: totalAmount,
      });

      // Update the totalAllProductAmount
      totalAllProductAmount += totalAmount;
    });

    // Create the final JSON structure
    const orderData = {
      customerName: customerDetails.customerName,
      customerPhone: customerDetails.customerPhone,
      customerEmail: customerDetails.customerEmail,
      customerAddress: customerDetails.customerAddress,
      totalAllProductAmount: totalAllProductAmount,
      createdAt: new Date().toISOString(),
      orderedProducts: orderedProducts,
    };

    // Log the JSON data to the console
    console.log(orderData);
  };

  // State to manage customer details
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
  });

  return (
    <div>
      <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
        <Container>
          <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green">
            এখনই অর্ডার করুন!
          </h1>
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 flex-wrap">
            {allProduct.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-md shadow-md w-full sm:w-full md:w-[32%] lg:w-[24%] transition-transform transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto"
                />
                <h2 className="text-lg font-bold text-main-dark-green mt-2 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description.length > 30
                    ? `${product.description.substring(0, 30)}...`
                    : product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg text-main-dark-green font-bold">
                    ৳{product.price}
                  </p>
                  <div className="flex items-center gap-2">
                    {cartArray.includes(product._id) ? (
                      <IoTrash
                        title="remove from cart"
                        className="text-red-500 "
                        onClick={() => handleDelete(product._id)}
                      />
                    ) : (
                      <AiOutlineShoppingCart
                        title="add to cart"
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleCart(product._id)}
                      />
                    )}
                    <AiOutlineInfoCircle className="text-green-500 cursor-pointer" />
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* cart sidebar start */}
      <div
        className={`fixed h-screen w-[300px] ${
          sidebarCartShow ? "right-0" : "right-[-300px]"
        } duration-300 bg-white top-0 p-3`}
      >
        <div
          onClick={() => setSidebarCartShow((prev) => !prev)}
          className="absolute shadow-lg w-[50px] h-[50px] bg-white top-[50%] translate-y-[-50%] rounded-tl-md rounded-bl-md left-[-50px] flex justify-center items-center"
        >
          <div className="w-[20px] h-[20px] rounded-full bg-red-500 flex justify-center items-center text-white text-[10px]">
            {cartArray.length === 0 ? "0" : cartArray.length}
          </div>
          <AiOutlineShoppingCart
            title="add to cart"
            className="text-green-500 cursor-pointer"
          />
        </div>
        <div className="w-full h-full overflow-y-scroll">
          <h3 className="text-lg font-semibold text-main-dark-green ">
            Your Cart
          </h3>
          {cartArray.length == 0 ? (
            "No product in your cart"
          ) : (
            <div className="w-full h-[300px] overflow-y-scroll mt-2 flex flex-col gap-y-2">
              {allProduct.map(
                (product) =>
                  cartArray.includes(product._id) && (
                    <div
                      key={product._id}
                      className="p-1 rounded-md flex-wrap border flex items-center gap-2 relative cursor-pointer"
                    >
                      <IoTrash
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 absolute right-1 top-[50%] -translate-y-1/2 cursor-pointer"
                      />
                      <div className="w-16 h-16 rounded-lg bg-[#d1d1d1] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-main-dark-green">
                          {product.name}
                        </p>
                        <small className="font-semibold text-main-dark-green">
                          ৳{" "}
                          {product.price * productQuantities[product._id] || 0}
                        </small>
                      </div>
                      <div className="flex items-center gap-2 mr-[25px]">
                        <button
                          onClick={() => handleDecrease(product._id)}
                          className="bg-green-500 text-white rounded-full p-2 focus:outline-none"
                        >
                          <IoRemoveSharp />
                        </button>
                        <span className="font-semibold text-green-500">
                          {productQuantities[product._id] || 0}
                        </span>
                        <button
                          onClick={() => handleIncrease(product._id)}
                          className="bg-green-500 text-white rounded-full p-2 focus:outline-none"
                        >
                          <IoAddSharp />
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
          {cartArray.length > 0 && (
            <div className="mt-4 flex flex-col gap-y-2">
              <div className="">
                <small className="text-main-dark-green">Customer Name*</small>
                <input
                  className="shadow-inner p-2"
                  placeholder="Your Name"
                  type="text"
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <small className="text-main-dark-green">Phone Number*</small>
                <input
                  className="shadow-inner p-2"
                  placeholder="Your Phone Number"
                  type="number"
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerPhone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <small className="text-main-dark-green">Email(optional)</small>
                <input
                  className="shadow-inner p-2"
                  placeholder="Your Email"
                  type="text"
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <small className="text-main-dark-green">Detail Address*</small>
                <input
                  className="shadow-inner p-2"
                  placeholder="Your Detailed Address"
                  type="text"
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerAddress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <div
                  className="py-[15px] w-full text-center bg-main-dark-green hover:bg-main-green duration-300 text-white rounded"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
