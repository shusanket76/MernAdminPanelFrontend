import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../features/hooks/useAuth";
import { FaTimesCircle } from "react-icons/fa";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const DashHeader = () => {
  const navigate = useNavigate();

  const [showsmallNav, setShowSmallNav] = useState(false);
  const { username, isManager, isAdmin } = useAuth();
  const [sendLogout, { isLoading, isError, isSuccess, error }] =
    useSendLogoutMutation();
  console.log(window.innerWidth);
  useEffect(() => {
    setShowSmallNav(false);
  }, [window.location.pathname]);
  console.log(showsmallNav);
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  const logOutButton = <button onClick={() => sendLogout()}>LOG OUT</button>;
  return (
    <main className="absolute left-0 right-0 top-0 ">
      <div className="">
        <ul className=" hidden w-full justify-around p-5 font-thin  text-white md:flex md:justify-around md:text-xl lg:text-2xl">
          <li className="p-2">
            <Link to="/dash/notes">NOTES</Link>
          </li>
          <li className="p-2">
            <Link to="/dash/notes/add">ADD NEW NOTE</Link>
          </li>
          {(isManager || isAdmin) && (
            <li className="p-2">
              {" "}
              <Link to="/dash/users">USERS</Link>
            </li>
          )}
          {(isManager || isAdmin) && (
            <li className="p-2">
              <Link to={"/dash/users/add"}>ADD NEW USER</Link>
            </li>
          )}
          <li className="p-2">{logOutButton}</li>
        </ul>{" "}
        <button
          className="absolute right-5  top-3 text-2xl text-white md:hidden"
          onClick={() => {
            setShowSmallNav((prev) => {
              return !prev;
            });
          }}
        >
          &#9776;
        </button>
      </div>
      {showsmallNav && (
        <div className="absolute z-20 h-screen w-full md:hidden">
          <button
            className="absolute right-5  top-3 text-3xl text-black"
            onClick={() => {
              setShowSmallNav((prev) => !prev);
            }}
          >
            <FaTimesCircle />
          </button>
          <div className="h-screen bg-gradient-to-br from-cyan-600 to-cyan-700 ">
            <ul className="grid w-full justify-center pt-36  text-3xl font-thin text-black">
              <li className="p-5">
                <Link to="/dash/notes">NOTES</Link>
              </li>
              <li className="p-5">
                <Link to="/dash/notes/add">ADD NEW NOTE</Link>
              </li>
              {(isManager || isAdmin) && (
                <li className="p-5">
                  {" "}
                  <Link to="/dash/users">USERS</Link>
                </li>
              )}
              {(isManager || isAdmin) && (
                <li className="p-5">
                  <Link to={"/dash/users/add"}>ADD NEW USER</Link>
                </li>
              )}
              <li className="p-5">{logOutButton}</li>
            </ul>{" "}
          </div>
        </div>
      )}
    </main>
    // <main className="bg-orange-500">
    //   <div className="relative bg-orange-600">
    //     <button className="absolute right-5  text-2xl top-0 md:hidden">
    //       &#9776;
    //     </button>
    //     <ul className="p-5 justify-around text-2xl mx-40 hidden  md:flex">
    //       {/* <li className="p-2">
    //       <Link to="/dash">HOME</Link>
    //     </li> */}
    //       <li className="p-2">
    //         <Link to="/dash/notes">NOTES</Link>
    //       </li>

    //       <li className="p-2">
    //         <Link to="/dash/notes/add">ADD NEW NOTE</Link>
    //       </li>
    //       {(isManager || isAdmin) && (
    //         <li className="p-2">
    //           {" "}
    //           <Link to="/dash/users">USERS</Link>
    //         </li>
    //       )}
    //       {(isManager || isAdmin) && (
    //         <li className="p-2">
    //           <Link to={"/dash/users/add"}>ADD NEW USER</Link>
    //         </li>
    //       )}
    //       <li className="p-2">{logOutButton}</li>
    //     </ul>
    //   </div>
    // </main>
  );
};

export default DashHeader;
