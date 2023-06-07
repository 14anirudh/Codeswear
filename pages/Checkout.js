import React from "react";
import Link from "next/link";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    const data = { cart, subTotal ,oid,email:"email"};
    //getting transaction token from server
    let a = await fetch(` ${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.body.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };
    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout

          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <title>Checkout</title>
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        
      />

      <section className="text-gray-600 body-font relative lg:mx-24 md:mx">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Checkout
            </h1>
            <h3 className="sm:text-xl text-xl font-medium title-font mb-4 text-gray-900">
              1.Delivery Details
            </h3>
          </div>
          <div className="mx-auto">
            <div className="flex flex-wrap">
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
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
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
                    Contact Number
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
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
                    Country
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
                    htmlFor="message"
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
            </div>
          </div>
          <h2 className="sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 mt-12">
            2.Cart Items
          </h2>
          <span className="subtotal sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 mt-12 ml-2">
            Subtotal : ${subTotal}
          </span>
          <div className="sidebar px-6 ">
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length === 0 && (
                <div className="my-4 text-xl mx-1">Your Cart is Empty</div>
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
              onClick={initiatePayment}
              className=" text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg my-4 -mx-4"
            >
              Proceed to Pay &#8377;{subTotal}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
