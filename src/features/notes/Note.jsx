import { useNavigate } from "react-router-dom";
import { selectNoteById } from "./notesApiSlice";
import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaPenSquare,
} from "react-icons/fa";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
    return (
      <>
        <tr className="text-thin   text-center">
          <td className=" text-1xl border-b-2 p-4">{note.username}</td>
          {/* <td className="border-2">{created}</td> */}
          <td className="hidden border-b-2 p-4 md:block">{updated}</td>
          {/* <td className="border-2">{note.title}</td> */}
          <td className="border-b-2 p-4">{note.text}</td>
          <td className="border-b-2 p-2 text-2xl">
            {/* {`${note.completed}`} */}
            {note.completed ? (
              <button className="text-green-900">
                <FaCheck />
              </button>
            ) : (
              <button className="text-red-900">
                <FaTimesCircle />
              </button>
            )}
          </td>

          <td className="border-b-2 text-2xl">
            <button
              className="bg-transparent text-white"
              onClick={() => handleEdit()}
            >
              <FaPenSquare />
            </button>
          </td>
        </tr>
      </>
    );
  } else {
    return null;
  }
};

export default Note;
