import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BsCart2 } from "react-icons/bs";

const Navbar = () => {
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
      <div className="cart absolute right-5 top-4">
        <BsCart2 className="text-2xl md:text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
