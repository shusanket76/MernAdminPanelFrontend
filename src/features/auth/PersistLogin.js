import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersists from "../hooks/usePersists";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useNavigate } from "react-router-dom";

import React from "react";

const PersistLogin = () => {
  const [persist] = usePersists();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const navigate = useNavigate();

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === true) {
      const verifyingToken = async () => {
        try {
          console.log("refreshing");
          await refresh();
          setTrueSuccess(true);

          return;
          //   navigate("/dash");
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) {
        verifyingToken();
      }
    }
    return () => (effectRan.current = true);
  }, []);
  let content;

  if (isLoading) {
    content = <p>LOADING.</p>;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = (
      <p>
        ERROR| <Link to="/login">LOG IN</Link> AGAIN
      </p>
    );
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return <>{content}</>;
};

export default PersistLogin;
