import React, { useEffect, useState } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaPenAlt } from "react-icons/fa";

const NewNoteForm = ({ users }) => {
  const { isAdmin, id } = useAuth();
  const [addNewNote, { isSuccess, isError, error }] = useAddNewNoteMutation();
  const [user, setUser] = useState(id);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showError, setShowError] = useState();
  const navigate = useNavigate();
  const onUserChanged = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setUser(value.toString());
  };

  useEffect(() => {
    setShowError(false);
  }, [text]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/notes");
    }
    if (isError) {
      setShowError(true);
    }
  }, [isSuccess, navigate, isError]);
  const onTextChange = (e) => setText(e.target.value);
  const onSaveNewNote = async () => {
    await addNewNote({ user, title, text });
  };

  const userOption = users.map((user) => {
    return (
      <>
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      </>
    );
  });
  const content = (
    <>
      <main className="grid h-fit min-h-screen w-full justify-center gap-2  bg-gradient-to-bl from-red-500 to-red-900 p-5 pt-24">
        <form className="grid h-fit justify-center  rounded-3xl bg-gradient-to-br from-red-950 to-red-500 p-10">
          <button className="grid justify-center text-5xl text-white">
            <FaPenAlt />
          </button>
          <h1 className="mt-2 text-center font-serif text-4xl text-white">
            ADD NEW NOTE
          </h1>
          {isAdmin && (
            <div className="mt-10 grid">
              {" "}
              <label className="text-xl text-white" htmlFor="user">
                USER
              </label>
              <select
                className="h-10 px-2 text-xl font-thin"
                id="user"
                value={user}
                onChange={onUserChanged}
              >
                <option value=""></option>
                {userOption}
              </select>
            </div>
          )}

          <label className="mt-4 text-xl text-white" htmlFor="text">
            TASK
          </label>
          <input
            className="h-10 px-2 text-xl font-thin"
            type="text"
            id="text"
            value={text}
            onChange={onTextChange}
          ></input>
          {showError && (
            <p className="text-center text-white">{error?.data?.message}</p>
          )}
          <div className="grid justify-center">
            <button
              className="mt-5 h-10 w-20 rounded-xl bg-yellow-500 hover:font-bold"
              type="button"
              onClick={onSaveNewNote}
            >
              {" "}
              SAVE
            </button>
          </div>
        </form>
      </main>
    </>
  );
  return <>{content}</>;
};

export default NewNoteForm;
