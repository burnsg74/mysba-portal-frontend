import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    console.log("Callback: Mounted");
  }, []);
  return null;
};

export default Callback;
