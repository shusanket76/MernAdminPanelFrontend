import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  return (
    <section className="grid h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <div className="grid gap-5 text-white">
        <h1 className=" text-center font-serif text-4xl md:text-6xl ">
          TODOLIST
        </h1>

        <div className="flex justify-around">
          <Link to="login">
            <button className="p-2 text-xl hover:rounded-xl hover:bg-blue-500 hover:text-black md:text-3xl">
              LOGIN
            </button>
          </Link>
          <Link to="signup">
            <button className="p-2 text-xl hover:rounded-xl hover:bg-red-500 hover:text-black md:text-3xl">
              REGISTER
            </button>
          </Link>
        </div>
        <h1 className="text-2xl font-light md:text-4xl">
          DEVELOPED BY SHUSANKET BASYAL
        </h1>
      </div>
    </section>
  );
};

export default Public;
