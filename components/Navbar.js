import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  logout
}) => {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };
   
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-between items-center shadow-xl sticky top-0 bg-white z-10">
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="logo m-2 flex flex-col justify-center items-center">
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="" />
        </Link>
        <p className="text-bold"></p>
      </div>
      <div className="nav py-2">
        <ul className="flex items-center space-x-6 font-bold mx-5">
          <Link href={"/Tshirts"}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/Footwear"}>
            <a>
              <li>Footwear</li>
            </a>
          </Link>
          <Link href={"/Shorts"}>
            <a>
              <li>Shorts</li>
            </a>
          </Link>
          <Link href={"/Hoodies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
        </ul>
      </div>

      <div className="cart absolute right-5 top-4 cursor-pointer flex items-center ">
          {dropDown && (
            <div
            className="absolute top-11 right-20 bg-black shadow-xl rounded-md w-32 px-2 py-2">
              <ul className="flex flex-col items-center space-y-2">
                
                <Link href="/Account">
                  <a>
                    <li className="text-l text-white">My Account</li>
                  </a>
                </Link>
                <Link href="/Orders">
                  <a>
                    <li className="text-l text-white">Orders</li>
                  </a>
                </Link>

                <a onClick={logout}>
                  <li className="text-l text-white">Logout</li>
                </a>
              </ul>
            </div>
          )}
          {user.value && <HiUserCircle onClick={toggleDropDown} className=" text-3xl md:text-5xl mx-4" />}
      
        {!user.value && (
          <Link href="/Login">
            <a>
              <button className="flex ml-6 mr-4 mt-1 md:ml-14 text-sm text-white bg-black border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Login
              </button>
            </a>
          </Link>
        )}

        <BsCart2 onClick={toggleCart} className="text-2xl md:text-4xl" />
      </div>

      <div
        ref={ref}
        className={`h-[100vh] sidebar overflow-y-scroll absolute top-0 right-0 bg-blue-200 py-10 px-6 transform transition-transform ${
          Object.keys(cart).length !== 0 ? `translate-x-0` : `translate-x-full`
        }`}
      >
        <h2 className="font-bold text-xl">Your cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl"
        >
          <AiOutlineCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 text-xl mx-1">Your Cart is Empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-1/3 flex items-center justify-center text-lg">
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
        <div className="flex my-6">
          <Link href="/Checkout">
            <button className="flex mx-2 text-white bg-black/80 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mx-2 text-white bg-black/80 border-0 py-2 px-8  focus:outline-none hover:bg-black rounded text-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
