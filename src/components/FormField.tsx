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
      <div id="form-container-vertical">
        <div id="form-label-vertical">{label}</div>
        <input
          className="form-text-vertical"
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
        <div id="form-label-horizontal">{label}</div>
        <input
          className="form-text-horizontal"
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
