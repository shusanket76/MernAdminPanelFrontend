import React from "react";
import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [samePwd, setsamePwd] = useState(false);
  const [edekha, setErrorDekha] = useState(false);
  useEffect(() => {
    if (password.length !== 0 && confirmPassword.length !== 0) {
      if (password === confirmPassword) {
        setsamePwd(true);
      } else {
        setsamePwd(false);
      }
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");

      navigate("/login");
      alert("USER CREATED! PLEASE LOG IN ");
    }
  }, [isSuccess, navigate]);
  useEffect(() => {
    if (isError) {
      setErrorDekha(true);
    }
  }, [isError]);
  useEffect(() => {
    setErrorDekha(false);
  }, [username, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewUser({ username, password, roles: ["Employee"] });
  };
  const canLogin = samePwd && username.length !== 0;

  return (
    <section className="grid h-screen w-full items-center justify-center bg-gradient-to-bl from-emerald-600  to-emerald-700 ">
      <form
        onSubmit={handleSubmit}
        className=" grid h-fit  w-96 rounded-lg  bg-gradient-to-br from-emerald-500 to-emerald-800 p-4 text-white "
        // onSubmit={onHandleSubmit}
        autoComplete="off"
      >
        <h1 className="mt-2 text-center text-2xl font-thin">SIGN UP</h1>
        <div className="mt-4 grid">
          <label className="mx-5 cursor-pointer" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            style={{ border: "1px solid black" }}
            // ref={userRef}
            className="mx-5 h-10  rounded-lg p-3 text-black "
          />
        </div>
        <div className="mt-2 grid">
          <label className="mx-5 cursor-pointer" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={"mx-5 h-10 rounded-b-lg bg-white p-3 text-black"}
          ></input>
        </div>
        <div className="mt-2 grid ">
          <label className="mx-5 cursor-pointer" htmlFor="confirmpassword">
            CONFIRM PASSWORD
          </label>
          <input
            id="confirmpassword"
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={
              confirmPassword.length
                ? samePwd
                  ? "mx-5 h-10 rounded-b-lg bg-green-500 p-3 text-black"
                  : "mx-5 h-10 rounded-b-lg bg-red-600 p-3 text-white"
                : "mx-5 h-10 rounded-b-lg bg-white p-3 text-black"
            }
          ></input>
        </div>
        <p className="ml-5 mt-2">{edekha && error?.data?.message}</p>
        {canLogin && (
          <div className="mt-2 grid justify-center">
            <button className="h-10 w-20 rounded-3xl border-2 bg-white text-black hover:font-bold ">
              SIGNUP
            </button>
          </div>
        )}

        <div className="text-md mx-5">
          HAVE AN ACCOUNT?
          <Link
            className="rounded-xl p-1 font-bold hover:bg-white hover:text-black"
            to="/login"
          >
            {" "}
            LOG IN
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
