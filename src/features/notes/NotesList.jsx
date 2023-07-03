import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import React from "react";
import useAuth from "../hooks/useAuth";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;

  if (isLoading) {
    content = <p>LOADING</p>;
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids, entities } = notes;
    let filterIds;
    if (isManager || isAdmin) {
      filterIds = [...ids];
    } else {
      filterIds = ids.filter((noteId) => {
        return entities[noteId].username === username;
      });
    }
    const tableContent = filterIds?.length
      ? filterIds.map((noteId) => <Note key={noteId} noteId={noteId}></Note>)
      : null;
    content = (
      <>
        <main className=" grid  h-fit min-h-screen w-full  gap-2 bg-gradient-to-bl from-purple-700 to-blue-700  pt-24 sm:px-5  ">
          <div className="grid h-fit w-full scale-50 rounded-2xl bg-gradient-to-br from-purple-800 to-blue-500 sm:scale-100  ">
            <button className=" grid justify-center text-5xl text-white">
              <FaCheckCircle />
            </button>

            <h1 className="mt-2 text-center font-serif text-4xl text-white">
              TODO LIST
            </h1>
            <table className="mt-5  text-xl">
              <thead className="text-white">
                <tr>
                  <th className=" border-b-2 p-3 font-normal">USERNAME</th>
                  <th className=" hidden border-b-2 p-3 font-normal md:block">
                    DATE
                  </th>
                  {/* <th className="border-2">CREATED</th> */}
                  {/* <th className="border-2">TITLE</th> */}
                  <th className="border-b-2 p-3 font-normal">TASK</th>
                  <th className=" border-b-2 p-3 font-normal">COMPLETED</th>
                  <th className="border-b-2 p-3 font-normal">EDIT</th>
                </tr>
              </thead>
              <tbody className="font-thin text-white">{tableContent}</tbody>
            </table>
          </div>
        </main>
      </>
    );
  }
  return <div>{content}</div>;
};

export default NotesList;
