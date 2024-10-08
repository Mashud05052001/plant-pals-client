import { useEffect, useState } from "react";

const useDebounce = (initialValue: string, delay = 500) => {
  const [debounceValue, setDebounceData] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceData(initialValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [initialValue, delay]);
  return debounceValue;
};

export default useDebounce;
