import { ChangeEventHandler, FocusEventHandler } from "react";
import "../styles/sass/FormField.css";

interface Props {
  label: string;
  orientation: "horizontal" | "vertical";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  hideInput?: boolean;
}

export const FormField = ({
  label,
  orientation,
  onChange,
  onBlur,
  id,
  name,
  hideInput,
}: Props) => {
  if (orientation === "vertical") {
    return (
      <div id="form-container">
        <div id="form-label">{label}</div>
        <input
          className="form-text"
          id={`form-text-${name}`}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={hideInput ? "password" : "text"}
        />
      </div>
    );
  }

  if (orientation === "horizontal") {
    return (
      <div id="form-container-horizontal">
        <div id="form-label">{label}</div>
        <input
          className="form-text"
          id={`form-text-${name}`}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={hideInput ? "password" : "text"}
        />
      </div>
    );
  }

  return <></>;
};
