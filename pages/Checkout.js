import React from "react";
import Link from "next/link";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/Orders`,
    cancelUrl: window.location.origin,
  });

}

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  console.log(cart);
  return (
    <div>
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
      <section className="text-gray-600 body-font relative lg:mx-24 md:mx">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col w-full">
            <h2 className=" text-3xl font-medium title-font mb-4 text-gray-900">
              Shopping Cart
            </h2>
            <hr />
            <span className="subtotal sm:text-xl text-xl font-medium title-font mb-4 text-gray-900 mt-8 ml-2">
              Subtotal : &#8377;{subTotal}
            </span>
          </div>

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
              onClick={() => {
                const lineItems = Object.keys(cart).map((k) => ({
                  price: cart[k].priceId, // Replace with the actual price ID
                  quantity: cart[k].qty,
                }));

                checkout({ lineItems });
              }}
              className=" text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg my-4 -mx-4"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
