import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
}

const Input = ({ title, name, className, ...props }: InputProps) => {
  return (
    <div className="mb-4 w-full">
      {title && (
        <label htmlFor={name} className="block font-medium mb-1">
          {title}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`input-class ${className || ""}`}
        {...props} // Spread remaining input attributes
      />
    </div>
  );
};

export default Input;
