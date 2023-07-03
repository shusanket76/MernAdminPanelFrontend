import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashedLayout from "./components/DashedLayout";
import Public from "./components/Public";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";
import EditUser from "./features/users/EditUser";
import AddNewUser from "./features/users/AddNewUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import Login from "./features/auth/Login";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import SignUp from "./features/auth/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashedLayout />}>
                <Route
                  element={<RequireAuth allowedRoles={["Manager", "Admin"]} />}
                >
                  <Route path="users">
                    <Route index element={<UsersList />}></Route>
                    <Route path="add" element={<AddNewUser />}></Route>
                    <Route path=":id" element={<EditUser />}></Route>
                  </Route>
                </Route>
                <Route path="notes">
                  <Route index element={<NotesList />}></Route>
                  <Route path="add" element={<NewNote />}></Route>
                  <Route path=":id" element={<EditNote />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
