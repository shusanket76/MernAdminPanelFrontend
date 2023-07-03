import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersists from "../hooks/usePersists";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setError] = useState("");
  const [persist, setPersist] = usePersists();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  const showLogin = password.length != 0 && username.length != 0;
  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);
  useEffect(() => {
    setError(false);
  }, [username, password]);
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));

      setPassword("");
      setUsername("");
      navigate("/dash/notes");
    } catch (err) {
      console.log("ERROR");
    }
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  if (isLoading) {
    return <p>LOADING..</p>;
  }

  const content = (
    <section className="grid h-screen w-full items-center justify-center bg-gradient-to-bl from-cyan-600 to-cyan-700  ">
      <form
        className="h-fit w-96  rounded-lg border-2 bg-gradient-to-br from-cyan-500 to-cyan-800  p-4  text-white backdrop-blur-xl "
        onSubmit={onHandleSubmit}
        autoComplete="off"
      >
        <h1 className="mt-2 text-center text-2xl font-thin">LOGIN</h1>
        <div className="mt-10">
          <label className="cursor-pointer" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUserInput}
            required
            placeholder="Username"
            ref={userRef}
            className="mx-5 h-10  rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
        </div>
        <div className="mt-4">
          <label className="cursor-pointer" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={handlePwdInput}
            required
            className="  mx-5 h-10   rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-red-700"
          ></input>
        </div>
        {showError && (
          <p className="mt-2 bg-red-800 text-center text-white ">
            {error?.data?.message}
          </p>
        )}
        {showLogin && (
          <div className="mt-3 grid justify-center">
            <button className="h-10 w-20 rounded-xl border bg-white p-2 text-black hover:font-bold  ">
              LOGIN
            </button>
          </div>
        )}
        {/* <div className="flex">
          <input
            type="checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          ></input>

          <p className="">Trust This Device</p>
        </div> */}
        <div className="text-md mt-4">
          DONT HAVE AN ACCOUNT?{" "}
          <Link
            className=" rounded-xl p-1 font-bold text-white hover:bg-white hover:text-black "
            to="/signup"
          >
            SIGN UP
          </Link>
        </div>
      </form>
    </section>
  );
  return <>{content}</>;
};

export default Login;
