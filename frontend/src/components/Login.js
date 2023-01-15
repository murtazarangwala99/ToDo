import React from "react";
import Heading from "../UIComponent/Heading";

function Login() {
  return (
    <>
      <Heading heading="Login Page" />
      <div className="flex flex-col justify-center items-center container">
        <form
          action="#"
          method="post"
          className="container flex flex-col gap-4 justify-center items-center my-8"
        >
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="user-email"
            >
              Enter Email :
            </label>
            <input
              type="text"
              name="user-email"
              id="user-email"
              className="my-1 rounded-sm text-black focus:bg-green-300"
            />
          </div>
          <div>
            <label
              className="text-slate-300 font-bold text-xl"
              htmlFor="user-password"
            >
              Enter Password:
            </label>
            <input
              type="password"
              className="my-1 rounded-sm text-black focus:bg-green-300"
              id="user-password"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
          >
            Submit
          </button>
        </form>
        {/* Signup Title */}
        <p>Still Not a User ? 👇 Click Below Button</p>
        <a
          href="./signup.html"
          className="bg-green-500 px-8 py-2 my-4 rounded-lg cursor-pointer hover:bg-green-300 hover:text-black"
        >
          SignUp
        </a>
      </div>
    </>
  );
}

export default Login;
