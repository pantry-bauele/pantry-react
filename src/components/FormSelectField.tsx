import { ChangeEventHandler } from "react";
import "../styles/sass/FormSelectField.css";

interface Props {
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  name: string;
  options: string[];
  value: string;
}

export const FormSelectField = ({
  label,
  onChange,
  options,
  name,
  value,
}: Props) => {
  let selectElements = options.map((optionName, index) => {
    return (
      <option key={index} value={optionName}>
        {optionName}
      </option>
    );
  });

  return (
    <div id="form-select-container">
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
