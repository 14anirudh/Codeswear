import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkout } from "./api/checkout";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const [address, setAddress] = useState("");
  return (
    <div className="checkout-form">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
      <section className="text-gray-600 body-font relative w-full lg:mr-48 md:mx">
        <div className="container py-10 mx-auto">
          <div className="flex flex-col w-full">
            <h2 className=" text-3xl font-medium title-font mb-4 text-gray-900">
              Shopping Cart
            </h2>
           
            <span className="subtotal sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 mt-2 ml-2">
              Your Cart total is : &#8377;{subTotal}
            </span>
          </div>
          <div></div>

          <div className="sidebar pl-6">
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length === 0 && (
                <div className="my-4 text-xl">Your Cart is Empty!</div>
              )}

              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-3">
                      <div className="font-semibold text-xl">
                        {cart[k].name}({cart[k].size}/{cart[k].variant})
                      </div>
                      <div className="w-1/3 flex items-center justify-center text-xl">
                        <AiFillMinusCircle
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="cursor-pointer"
                        />
                        <span className="mx-2">{cart[k].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="p-2 w-full"></div>
            <button
              onClick={() => {
                const lineItems = Object.keys(cart).map((k) => ({
                  price: cart[k].priceId, // Replace with the actual price ID
                  quantity: cart[k].qty,
                }));

                checkout({ lineItems });
              }}
              className=" text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg my-4"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </section>
      </div>
      <div>
        <section className="text-gray-600 body-font relative">
          <div className="container py-10 px-4">
            <div className="flex flex-col text-center w-full mb-4">
              <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                Delivery Details
              </h1>
             
            </div>
            <div className=" md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone No.
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                    City
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Pincode
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      
    </div>
  );
};

export default Checkout;
