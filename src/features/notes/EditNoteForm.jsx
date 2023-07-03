import React, { useEffect } from "react";
import { useState } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FaPenSquare } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const EditNoteForm = ({ note, users }) => {
  const { isAdmin, id, ogusername } = useAuth();

  const [username, setUserName] = useState(note.user);
  // const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [updateNote, { isSuccess, isError }] = useUpdateNoteMutation();
  const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error }] =
    useDeleteNoteMutation();
  const navigate = useNavigate();
  const userOption = users.map((user) => {
    return (
      <>
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      </>
    );
  });
  // const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onUserChanged = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setUserName(value.toString());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);
  const onSaveNewNote = async () => {
    await updateNote({ id: note.id, user: username, text, completed });
  };
  useEffect(() => {
    if (isDelSuccess) {
      navigate("/dash/notes");
    }
  }, [isDelError, isDelSuccess]);
  const onDeleteNote = async () => {
    await deleteNote({ id: note.id });
  };
  const content = (
    <main className="grid h-fit min-h-screen w-full items-center justify-center gap-2  bg-gradient-to-bl from-yellow-600 to-yellow-500 p-5 pt-24">
      <form className="grid h-fit justify-center  rounded-3xl bg-gradient-to-br from-yellow-700 to-yellow-500 p-16">
        <button className="grid justify-center pb-4 text-5xl text-white">
          <FaPenSquare />
        </button>
        <h1 className="mt-2 text-center font-serif text-4xl text-white">
          EDIT TASK
        </h1>
        {isAdmin && (
          <div className="mt-10 grid">
            <label className="cursor-pointer text-xl text-white" htmlFor="user">
              USER
            </label>
            <select
              id="user"
              className="h-10 px-2 text-xl font-thin"
              defaultValue={username}
              onChange={onUserChanged}
            >
              <option value=""></option>
              {userOption}
            </select>
          </div>
        )}
        {/* <label htmlFor="title">TITLE</label>
      <input
      type="text"
      id="title"
      value={title}
      onChange={onTitleChange}
    ></input> */}

        <label
          className="mt-4 cursor-pointer text-xl text-white"
          htmlFor="text"
        >
          TEXT
        </label>
        <input
          type="text"
          id="text"
          value={text}
          className="h-10 px-2 text-xl font-thin"
          onChange={onTextChange}
        ></input>
        <p className="mt-2 text-white">{error?.data?.message}</p>
        {completed && (
          <div className="mt-4">
            {" "}
            <label
              className="cursor-pointer text-xl text-white"
              htmlFor="completed"
            >
              COMPLETED
            </label>
            {/* <input
              type="button"
              id="completed"
              className="ml-2"
              value={completed}
              checked
              onChange={() => setCompleted(!completed)}
            ></input> */}
            <button
              id="completed"
              type="button"
              onClick={() => setCompleted(!completed)}
              className="m-5 ml-2   text-xl text-black"
            >
              <FaCheckCircle />
            </button>
          </div>
        )}
        {completed || (
          <div className="mt-4">
            {" "}
            <label
              className="cursor-pointer text-xl text-white"
              htmlFor="completed"
            >
              COMPLETED
            </label>
            {/* <input
              type="checkbox"
              id="completed"
              className="ml-2"
              value={completed}
              onChange={() => setCompleted(!completed)}
            ></input> */}
            <button
              id="completed"
              type="button"
              onClick={() => setCompleted(!completed)}
              className="m-5 ml-2   text-xl text-black"
            >
              <FaTimesCircle />
            </button>
          </div>
        )}
        <div className="flex justify-around">
          <button
            className="mt-5 h-10 w-20 rounded-xl bg-yellow-500 hover:font-bold"
            type="button"
            onClick={onSaveNewNote}
          >
            {" "}
            SAVE
          </button>
          <button
            className="mt-5 h-10 w-20 rounded-xl bg-red-500 hover:font-bold"
            type="button"
            onClick={onDeleteNote}
          >
            {" "}
            DELETE
          </button>
        </div>
      </form>
    </main>
  );
  return <>{content}</>;
};

export default EditNoteForm;
