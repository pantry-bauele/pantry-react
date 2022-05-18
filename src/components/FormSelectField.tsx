import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from "react";
import "../styles/sass/FormSelectField.css";

interface Props {
  label: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
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
      <select
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
