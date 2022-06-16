import { useState } from "react";

export function InputField({
  handleValue,
  label,
  placeholder,
  type = "text",
  htmlFor,
}) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    handleValue(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        className="block text-sm font-bold text-gray-700"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
