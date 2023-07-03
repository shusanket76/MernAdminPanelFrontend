import React from "react";
import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { FaUserPlus } from "react-icons/fa";

const USER_REGEX = /^[A-z]{3,20}/;
const PASS_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const AddNewUser = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  // check this
  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };
  // const option = Object.values(ROLES).map((role) => {
  //   return (
  //     <option key={role} value={role}>
  //       {role}
  //     </option>
  //   );
  // });
  const content = (
    <>
      <main className="grid h-fit min-h-screen w-full justify-center gap-2  bg-gradient-to-bl from-pink-800 to-pink-900 p-5 pt-24">
        {/* <p>{error?.data?.message}</p> */}
        <form className="grid h-fit justify-center  rounded-3xl bg-gradient-to-br from-pink-950 to-pink-500 p-10">
          <button className="grid justify-center text-5xl text-white">
            <FaUserPlus />
          </button>
          <h1 className="mt-2 text-center font-serif text-4xl text-white">
            ADD NEW USER
          </h1>
          <div className="mt-10 grid">
            <label className="text-xl text-white" htmlFor="username">
              USERNAME
            </label>
            <input
              className="h-10 px-2 text-xl font-thin"
              type="text"
              id="username"
              value={username}
              onChange={onUsernameChange}
            ></input>
          </div>

          <label className="mt-3 text-xl text-white" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="text"
            id="password"
            className="h-10 px-2 text-xl font-thin"
            value={password}
            onChange={onPasswordChange}
          ></input>
          {/* <label htmlFor="roles">ASSIGNED ROLES</label>
          <select
            id="roles"
            value={roles}
            onChange={onRolesChanged}
            multiple={true}
          >
            <option value=""></option>
            {option}
          </select> */}
          <div className="grid justify-center">
            <button
              className="mt-5 h-10 w-20 rounded-xl bg-yellow-500 hover:font-bold"
              type="button"
              onClick={onSaveUserClicked}
            >
              SAVE
            </button>
          </div>
        </form>
      </main>
    </>
  );

  return <>{content}</>;
};

export default AddNewUser;
