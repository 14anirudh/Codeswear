import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product";

const Tshirts = ({ products }) => {

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link href={"/Product/wear-the-code"}>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg ">
                <a className="block relative rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1655571786_6023057.jpg?format=webp&w=360&dpr=1.5"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
export default Tshirts;
