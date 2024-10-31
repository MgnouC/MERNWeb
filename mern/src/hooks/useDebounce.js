import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setValueDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return valueDebounce;
};
