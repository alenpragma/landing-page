"use client";
import React, { useState } from "react";
import Container from "../_container/Container";
import bannerproduct from "../../_svg/banneproduct.svg";
import Image from "next/image";
import axios from "axios"
const OnlyAidBoxBuy = () => {
  let [onlinePaymentBox, setOnlinePaymentBox] = useState(false);
  let [quantity, setQuantity] = useState(1);
  let [customerName, setCustomerName] = useState("");
  let [customerPhone, setCustomerPhone] = useState("");
  let [customerEmail, setCustomerEmail] = useState("");
  let [customerAddress, setCustomerAddress] = useState("");
  let [insideCity, setInsideCity] = useState(true);
  let [error, setError] = useState("");

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCityToggle = () => {
    setInsideCity((prevInsideCity) => !prevInsideCity);
  };

  const handleConfirmation = () => {
    // Perform validation
    if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
      setError("Please fill in all customer details.");
      return;
    }

    // Calculate total amount based on quantity and city preferences
    const basePrice = 350;
    let totalAmount = quantity * basePrice;
    totalAmount += insideCity ? 50 : 0;
    totalAmount += !insideCity ? 100 : 0;

    // Create JSON data
    const orderData = {
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      onlinePay: true,
      totalAllProductAmount: totalAmount,
      insideCity: insideCity && insideCity,
      outsideCity: !insideCity && true,
      orderedProducts: [
        {
          name: "Good Morning First Aid Box",
          quantity: quantity,
          totalAmount: totalAmount,
        },
      ],
    };

    // Send POST request to the API endpoint
    axios
      .post(
        "https://goodmorning-aid-backend.onrender.com/api/v1/order/createorder",
        orderData
      )
      .then((response) => {
        // Handle success
        console.log("Order submitted successfully:", response.data.paymentResponse.payment_url);
        window.location.href =response.data.paymentResponse.payment_url

        // Clear form fields and reset quantity to 1
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
        setCustomerAddress("");
        setInsideCity(true);
        setQuantity(1);
        setError("");
        setOnlinePaymentBox(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting order:", error);
        setError("Error submitting order. Please try again.");
      });

    // Log JSON data
    console.log(orderData);
  };

  return (
    <div>
      <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
        <Container>
          <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green mb-5">
            এখনই অর্ডার করুন আমাদের স্পেশাল ফার্স্ট এইড বক্স
          </h1>

          <div className="flex flex-col items-center  md:flex-row gap-y-5 md:gap-x-5 mt-5 md:mt-10">
            <div className="w-full md:w-[49%]">
              <Image src={bannerproduct} className="w-full h-auto" />
            </div>
            <div className="w-full flex flex-col gap-y-5 md:w-[49%]">
              <p className="text-main-dark-green font-bold text-[25px]">
                মূল্য - ৩৫০ টাকা
              </p>
              <div className="px-[30px] py-[10px] rounded-md bg-main-green text-center text-white">
                Menual order
              </div>
              <div className="">
                {onlinePaymentBox && (
                  <div className="p-2 shadow-inner rounded-lg">
                    {/* order functionality here */}

                    <div className="p-2 shadow-inner rounded-lg">
                      <div className="p-4 shadow-inner rounded-lg bg-white">
                        {/* Order functionality here */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleQuantityDecrease}
                            className="bg-main-green text-white px-4 py-2 rounded focus:outline-none"
                          >
                            -
                          </button>
                          <span className="text-xl">{quantity}</span>
                          <button
                            onClick={handleQuantityIncrease}
                            className="bg-main-green text-white px-4 py-2 rounded focus:outline-none"
                          >
                            +
                          </button>
                        </div>

                        {/* Additional input fields for customer details */}
                        <div className="flex gap-y-4 flex-col mt-3 mb-3">
                          <input
                            type="text"
                            placeholder="Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="input-field p-2 border border-main-green"
                          />
                          <input
                            type="text"
                            placeholder="Customer Phone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="input-field p-2 border border-main-green"
                          />
                          <input
                            type="text"
                            placeholder="Customer Email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="input-field p-2 border border-main-green"
                          />
                          <input
                            type="text"
                            placeholder="Customer Address"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="input-field p-2 border border-main-green"
                          />
                        </div>
                        {error}
                        {/* Checkboxes for city preferences */}
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={insideCity}
                            onChange={handleCityToggle}
                            className="form-checkbox h-5 w-5 text-main-dark-green"
                          />
                          <label className="text-main-dark-green">
                            Inside City (+৳50)
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!insideCity}
                            onChange={handleCityToggle}
                            className="form-checkbox h-5 w-5 text-main-dark-green"
                          />
                          <label className="text-main-dark-green">
                            Outside City (+৳100)
                          </label>
                        </div>

                        {/* Display total amount */}
                        <p className="text-main-dark-green">
                          Total Amount: ৳
                          {quantity * 350 + (insideCity ? 50 : 100)}
                        </p>
                      </div>

                      {/* Main confirmation button here */}
                      <div
                        onClick={handleConfirmation}
                        className="px-4 py-2 rounded-md bg-main-dark-green text-center mt-5 text-white cursor-pointer"
                      >
                        Confirm the order
                      </div>
                    </div>
                    {/* Main confirmation button here */}

                    {/* main confirmatrion button here */}
                  </div>
                )}
                <div
                  onClick={() => setOnlinePaymentBox((prev) => !prev)}
                  className="px-[30px] cursor-pointer py-[10px] rounded-md bg-main-green text-center mt-5 text-white"
                >
                  {onlinePaymentBox
                    ? "cancel online order with payment"
                    : " Order with online payment"}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OnlyAidBoxBuy;
