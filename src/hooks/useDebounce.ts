import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounce;
};
