import { useState } from "react";

const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [toggle, setToggle] = useState(initialValue);
  const handleToggle = () => setToggle(!toggle);
  return [toggle, handleToggle];
};
export default useToggle;
