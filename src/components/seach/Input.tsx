import React, { useEffect, useRef } from "react";

declare interface AppProps {
  children?: React.ReactNode;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  placeholder?: string,
  value?: string | any;
  name?: string | any;
}

function Input(props: AppProps) {
  const { onInput, value, name, placeholder } = props;
  const field = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const currentField = field.current;

    if (currentField && value) {
      currentField.value = value;
    }
  }, [value]);

  return (
    <input
      type="text"
      name={name}
      ref={field}
      placeholder={placeholder}
      onInput={onInput}
    />
  );
}

export default Input;
