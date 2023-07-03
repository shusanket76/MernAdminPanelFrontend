import { store } from "../../app/store";
import { extendedusersApiSlice } from "../users/usersApiSlice";
import { extendedNotesApiSlice } from "../notes/notesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

const Prefetch = () => {
  const singlerun = useRef(false)
  useEffect(() => {
    console.log("subscribing");
    const notes = store.dispatch(
      extendedNotesApiSlice.endpoints.getNotes.initiate()
    );
    const users = store.dispatch(
      extendedusersApiSlice.endpoints.getUsers.initiate()
    );
    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Prefetch;
