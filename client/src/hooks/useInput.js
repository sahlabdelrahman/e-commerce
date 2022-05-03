import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    resetValue: () => setValue(""),
    bind: {
      onChange: (event) => {
        setValue(event.target.value);
      },
      value,
    },
  };
};

export default useInput;
