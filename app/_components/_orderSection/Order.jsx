"use client";
import React, { useEffect, useState } from "react";
import Container from "../_container/Container";
import { AiOutlineShoppingCart, AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";
import { IoTrash, IoAddSharp, IoRemoveSharp } from "react-icons/io5";

const Order = () => {
  // get all product functionality
  let [allProduct, setAllProduct] = useState([]);
  let [totalProductAmount, setTotalProductAmount] = useState(0);

  // delivery state
  const [insideCity, setInsideCity] = useState(false); // Default: inside city
  const [outsideCity, setOutsideCity] = useState(false);
  const [prevDeliveryCost, setPrevDeliveryCost] = useState(0);
  const [prevInsideCity, setPrevInsideCity] = useState(false);
  const [prevOutsideCity, setPrevOutsideCity] = useState(false);

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
      // Get the quantity of the product being deleted
      const deletedQuantity = productQuantities[id] || 0;

      // If it is, remove the ID from the cartArray
      setCartArray(cartArray.filter((productId) => productId !== id));

      // Update the total amount by subtracting the product price multiplied by the quantity
      setTotalProductAmount(
        (prevTotal) =>
          prevTotal -
          (allProduct.find((p) => p._id === id)?.price || 0) * deletedQuantity
      );

      // Remove the quantity of the deleted product from the productQuantities state
      setProductQuantities((prevQuantities) => {
        const { [id]: deletedQuantity, ...rest } = prevQuantities;
        return rest;
      });
    }
    setInsideCity(false);
    setOutsideCity(false);
    setPrevInsideCity(false);
    setPrevOutsideCity(false);
    setTotalProductAmount(0);
    setProductQuantities({});
    setCustomerDetails({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
    });
  };

  // product increase decrease management
  const [productQuantities, setProductQuantities] = useState({});

  // product increase decrease management
  const handleIncrease = (id) => {
    // Find the current quantity for the product
    const currentQuantity = productQuantities[id] || 0;

    // Update the quantity in the state
    setProductQuantities({
      ...productQuantities,
      [id]: currentQuantity + 1,
    });

    // Update the total amount
    setTotalProductAmount(
      (prevTotal) =>
        prevTotal + (allProduct.find((p) => p._id === id)?.price || 0)
    );
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

      // Update the total amount by subtracting the product price
      setTotalProductAmount(
        (prevTotal) =>
          prevTotal - (allProduct.find((p) => p._id === id)?.price || 0)
      );
    } else if (currentQuantity === 1) {
      // If the quantity is 1, remove the product from the cart
      setProductQuantities((prevQuantities) => {
        const { [id]: deletedQuantity, ...rest } = prevQuantities;
        return rest;
      });

      // Update the total amount by subtracting the product price multiplied by the quantity
      setTotalProductAmount(
        (prevTotal) =>
          prevTotal - (allProduct.find((p) => p._id === id)?.price || 0)
      );
    }
    // If currentQuantity is 0, do nothing to prevent further decrease
  };
  // Confirm order functionality
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added success state

  const handleConfirmOrder = () => {
    // Validate required fields
    if (
      !customerDetails.customerName ||
      !customerDetails.customerPhone ||
      !customerDetails.customerAddress ||
      cartArray.length === 0
    ) {
      // Handle the case when required fields are missing
      setError("Please fill in all required fields and select products.");
      return;
    }

    // Validate product quantities
    for (const productId of cartArray) {
      if (!productQuantities[productId] || productQuantities[productId] <= 0) {
        // Handle the case when product quantities are not selected
        setError("Please select quantities for all products.");
        return;
      }
    }

    if (!insideCity && !outsideCity) {
      // Handle the case when the delivery point is not selected
      setError(
        "Please select the delivery point (Inside City or Outside City)."
      );
      return;
    }

    // Calculate additional cost based on inside city or outside city
    const additionalCost = insideCity ? 50 : outsideCity ? 100 : 0;

    // Create an array to store ordered products
    const orderedProducts = [];

    // Calculate the total amount
    const totalAllProductAmount = totalProductAmount + additionalCost;

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
    });

    // Create the final JSON structure
    const orderData = {
      customerName: customerDetails.customerName,
      customerPhone: customerDetails.customerPhone,
      customerEmail: customerDetails.customerEmail,
      customerAddress: customerDetails.customerAddress,
      insideCity: insideCity,
      outsideCity: outsideCity,
      totalAllProductAmount: totalProductAmount,
      createdAt: new Date().toISOString(),
      orderedProducts: orderedProducts,
    };

    // Make the POST request to your endpoint
    axios
      .post(
        "https://goodmorning-aid-backend.onrender.com/api/v1/order/createorder",
        orderData
      )
      .then((response) => {
        // Check if the order was successfully created
        if (response.status === 201) {
          // Reset state and show success message
          setCartArray([]);
          setProductQuantities({});
          setCustomerDetails({
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            customerAddress: "",
          });
          setTotalProductAmount(0);
          setInsideCity(true); // Reset checkboxes
          setOutsideCity(false);
          setError(""); // Clear any existing error messages
          setSuccess("Congratulations! Your order was successfully placed.");
          setTimeout(() => {
            setSuccess("");
          }, [5000]);
          setInsideCity(false);
          setOutsideCity(false);
          setPrevInsideCity(false);
          setPrevOutsideCity(false);
          setTotalProductAmount(0);
          setCartArray([]);
          setProductQuantities({});
          setCustomerDetails({
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            customerAddress: "",
          });
        } else {
          // Handle other response statuses or errors if needed
          setError(
            "An error occurred while placing the order. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An unexpected error occurred. Please try again.");
      });
  };

  // State to manage customer details
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
  });
  //  total delivery cost add on total amount
  const updateTotalProductAmount = (isInsideCity, isOutsideCity) => {
    // Calculate additional cost based on inside city or outside city
    const additionalCost = isInsideCity ? 50 : isOutsideCity ? 100 : 0;

    // Calculate the previous delivery cost
    const prevAdditionalCost =
      prevInsideCity && !isInsideCity ? 50 : prevOutsideCity ? 100 : 0;

    // Adjust totalProductAmount based on additionalCost and previous delivery cost
    const totalAmountWithAdditionalCost =
      totalProductAmount - prevAdditionalCost + additionalCost;

    // Update the total product amount state
    setTotalProductAmount(totalAmountWithAdditionalCost);

    // Update previous states for the next iteration
    setPrevInsideCity(isInsideCity);
    setPrevOutsideCity(isOutsideCity);
  };

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
          <p className="text-[13px] text-green-600">{success && success}</p>
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
              <p>Total amount:{totalProductAmount}</p>
              <p>{success && success}</p>
              <p className="text-[13px] text-red-500">{error && error}</p>
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
              <div className="flex items-center gap-2 mt-2">
                <label>
                  <input
                    type="checkbox"
                    checked={insideCity}
                    onChange={() => {
                      setInsideCity(!insideCity);
                      setOutsideCity(false);
                      // Calculate and update the total product amount based on the selected checkboxes
                      updateTotalProductAmount(!insideCity, false);
                    }}
                  />
                  Inside City
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={outsideCity}
                    onChange={() => {
                      setOutsideCity(!outsideCity);
                      setInsideCity(false);
                      // Calculate and update the total product amount based on the selected checkboxes
                      updateTotalProductAmount(false, !outsideCity);
                    }}
                  />
                  Outside City
                </label>
              </div>
              <div className=" mt-2">
                <div
                  className="py-[15px] cursor-pointer  text-center bg-main-dark-green hover:bg-main-green duration-300 text-white rounded"
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
