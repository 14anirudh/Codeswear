import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import {
  AiOutlineCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

const Navbar = () => {
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
    <div className="flex flex-col md:flex-row md:justify-start justify-between items-center shadow-xl">
      <div className="logo m-2">
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="" />
        </Link>
      </div>
      <div className="nav py-2">
        <ul className="flex items-center space-x-6 font-bold mx-5">
          <Link href={"/Tshirts"}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/Mugs"}>
            <a>
              <li>Mugs</li>
            </a>
          </Link>
          <Link href={"/Stickers"}>
            <a>
              <li>Stickers</li>
            </a>
          </Link>
          <Link href={"/Hoodies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        onClick={toggleCart}
        className="cart absolute right-5 top-4 cursor-pointer"
      >
        <BsCart2 className="text-2xl md:text-4xl" />
      </div>
      <div
        ref={ref}
        className="w-60 h-full z-10 sidebar absolute top-0 right-0 bg-blue-200 py-10 px-6 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl">Your cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl"
        >
          <AiOutlineCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-3">
              <div className="w-2/3 font-semibold">The Catalyzer</div>
              <div className="w-1/3 flex items-center justify-center text-lg">
                <AiFillMinusCircle className="cursor-pointer" /> <span className="mx-2">1</span>
                <AiFillPlusCircle className="cursor-pointer" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-3">
              <div className="w-2/3 font-semibold">Shooting Stars</div>
              <div className="w-1/3 flex items-center justify-center text-lg">
                <AiFillMinusCircle className="cursor-pointer" /> <span className="mx-2">1</span>
                <AiFillPlusCircle className="cursor-pointer" />
              </div>
            </div>
          </li>
        </ol>
        <button className="flex mx-auto text-white bg-black/80 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">Proceed To Buy</button>
      
      </div>
    </div>
  );
};

export default Navbar;
