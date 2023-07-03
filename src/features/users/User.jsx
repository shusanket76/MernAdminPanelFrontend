import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { FaUserEdit } from "react-icons/fa";
import React from "react";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    return (
      <tr className="text-thin  text-center">
        <td className="text-1xl border-b-2 p-4">{user.username}</td>
        <td className="border-b-2 p-4 text-2xl">
          <button className="text-2xl" onClick={() => handleEdit()}>
            {" "}
            <FaUserEdit />
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default User;
