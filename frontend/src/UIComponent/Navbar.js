import React from "react";

function Navbar() {
  return (
    <>
      <nav className="container w-full m-auto">
        <ul className="container flex justify-between gap-1 flex-wrap">
          <button className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg">
            Home
          </button>
          <div className="flex gap-6">
            <button className="px-4 py-2 border-2 cursor-pointer hover:bg-green-300 hover:text-black rounded-lg">
              Developer
            </button>
            <button className="px-4 py-2 border-2 cursor-pointer hover:bg-red-700 hover:text-black rounded-lg">
              LogOut
            </button>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
