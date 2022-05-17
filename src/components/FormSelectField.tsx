import { ChangeEventHandler, FocusEventHandler } from "react";
import "../styles/sass/FormSelectField.css";

interface Props {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  hideInput?: boolean;
  options: string[];
}

export const FormSelectField = ({
  label,
  onChange,
  onBlur,
  id,
  options,
  name,
  hideInput,
}: Props) => {
  console.log(options);

  let selectElements = options.map((optionName, index) => {
    return (
      <option key={index} value={optionName}>
        {optionName}
      </option>
    );
  });

  console.log(selectElements);
  return (
    <div id="form-select-container">
      <select className="form-select" id={`form-select-${name}`} name={name}>
        {selectElements}
      </select>
    </div>
  );
};
