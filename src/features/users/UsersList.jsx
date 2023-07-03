import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;
  if (isLoading) {
    content = <p>LOADING...</p>;
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
    content = (
      <>
        <main className="grid h-fit min-h-screen w-full gap-2 bg-gradient-to-bl from-green-700 to-green-700 p-5 pt-24">
          <div className="grid h-fit w-full rounded-2xl bg-gradient-to-br from-green-800 to-green-500 p-5">
            <button className=" grid justify-center text-5xl text-white">
              <FaUsers />
            </button>
            <h1 className="mt-2 text-center font-serif text-4xl text-white">
              USERS
            </h1>
            <table className="mt-5  text-xl">
              <thead className="text-white">
                <tr>
                  <th className=" border-b-2 p-3 font-normal">USERNAME</th>

                  <th className=" border-b-2 p-3 font-normal">EDIT</th>
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

export default UsersList;
