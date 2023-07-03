import React, { useEffect, useState } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { FaUserEdit, FaTrash, FaSave } from "react-icons/fa";

const USER_REGEX = /^[A-z]{3,20}/;
const PASS_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isError, isSuccess, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    {
      isLoading: idDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeleteUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const [showError, showDeleteError] = useState();
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
    if (isDelSuccess) {
      showDeleteError(true);
      navigate("/dash/users");
    }
  }, [isDelSuccess, isSuccess, navigate]);
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
  const onActiveChanged = () => setActive((prev) => !prev);
  const onSavedUserClick = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles: ["Employee"],
        active,
      });
    } else {
      await updateUser({ id: user.id, username, roles, active, password });
    }
  };
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };
  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }
  // const option = Object.values(ROLES).map((role) => {
  //   return (
  //     <option key={role} value={role}>
  //       {role}
  //     </option>
  //   );
  // });
  const content = (
    <>
      <main className="grid h-fit min-h-screen w-full  justify-center gap-2  bg-gradient-to-bl from-orange-600 to-orange-800 p-5 pt-24">
        <form className="grid h-fit justify-center  rounded-3xl bg-gradient-to-br from-orange-700 to-orange-500 p-16">
          <button className="grid justify-center pb-4 text-5xl text-white">
            <FaUserEdit />
          </button>
          <h1 className="mt-2 text-center font-serif text-4xl text-white">
            EDIT USER
          </h1>
          <label
            className="mt-4 cursor-pointer text-xl text-white"
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            type="text"
            className="h-10 px-2 text-xl font-thin"
            id="username"
            value={username}
            onChange={onUsernameChange}
          ></input>
          <label
            className="mt-3 cursor-pointer text-xl text-white"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="h-10 px-2 text-xl font-thin"
            onChange={onPasswordChange}
          ></input>
          {/* <label htmlFor="roles">ASSIGNED ROLES</label>
          <select
          id="roles"
          value={roles}
          onChange={onRolesChanged}
          multiple={true}
          size="4"
          >
          <option value=""></option>
          {option}
        </select> */}
          {/* <label htmlFor="userActive">ACTIVE</label>
          <input
          id="userActive"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        ></input> */}
          {showError && (
            <p className="mt-2 text-center text-white">
              {delError?.data?.message}
            </p>
          )}

          <div className="flex justify-around">
            <button
              className="mt-5 h-10 w-20 rounded-xl bg-yellow-500 hover:font-bold"
              type="button"
              onClick={onSavedUserClick}
              disabled={!canSave}
            >
              SAVE
            </button>
            <button
              className="mt-5 h-10 w-20 rounded-xl bg-red-500 hover:font-bold"
              type="button"
              onClick={onDeleteUserClicked}
            >
              DELETE
            </button>
          </div>
        </form>
      </main>
    </>
  );

  return <>{content};</>;
};

export default EditUserForm;
