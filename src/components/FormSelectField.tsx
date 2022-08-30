import { ChangeEventHandler } from "react";
import "../styles/sass-built/FormSelectField.css";

interface Props {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  name: string;
  options: string[];
  value: string;
}

export const FormSelectField = ({ onChange, options, name, value }: Props) => {
  let selectElements = options.map((optionName, index) => {
    return (
      <option key={index} value={optionName}>
        {optionName}
      </option>
    );
  });

  return (
    <div className="form-select-container">
      <select
        value={value}
        className="form-select"
        id={`form-select-${name}`}
        name={name}
        onChange={onChange}
      >
        {selectElements}
      </select>
    </div>
  );
};
