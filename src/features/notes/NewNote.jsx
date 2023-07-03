import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
const NewNote = () => {
  const users = useSelector(selectAllUsers);
  if (!users) {
    return <p>NO CONTENT TO DISPLAY</p>;
  }
  const content = users ? <NewNoteForm users={users}></NewNoteForm> : null;
  return <>{content}</>;
};

export default NewNote;
