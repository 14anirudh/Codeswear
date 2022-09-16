import React from "react";
import Link from "next/link";

const signup = () => {
  return (
    <div>
      {/* <!-- component --> */}
      <div className="bg-grey-lighter min-h-screen flex justify-between ">
        <div className="md:w-8/12 lg:w-6/12 my-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full"
            alt="Phone image"
          />
        </div>
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className=" px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className=" text-3xl text-center">Sign up</h1>
            <p className="text-black my-2 text-center">
              Already have an account?
              <Link href="/login">
                <a className="text-blue-600 border-b border-grey-dark ">
                  Log in
                </a>
              </Link>
            </p>
            <input
              type="text"
              className="block border-b border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
            />

            <input
              type="text"
              className="block border-b border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              className="block border-b border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              className="block border-b border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and&nbsp;
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
