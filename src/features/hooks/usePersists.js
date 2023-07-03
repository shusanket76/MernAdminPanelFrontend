import { useState, useEffect } from "react";

const usePersists = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || true
  );
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPersist];
};
export default usePersists;
