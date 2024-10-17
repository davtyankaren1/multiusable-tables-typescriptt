import React from "react";
import "./CustomInput.css";

interface CustomInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  placeholder,
  onChange
}) => {
  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className='custom-input'
    />
  );
};

export default CustomInput;
