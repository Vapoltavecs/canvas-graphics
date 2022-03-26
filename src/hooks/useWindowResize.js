import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () =>
    setSizes({ height: window.innerHeight, width: window.innerWidth });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () =>  window.removeEventListener("resize", handleResize);
  }, []);
  return sizes;
};
