import { ChangeEventHandler, FocusEventHandler } from "react";
import "../styles/sass/FormField.css";

interface Props {
  label: string;
  orientation: "horizontal" | "vertical";

  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  hideInput?: boolean;
  value?: string;
}

export const FormField = ({
  label,
  orientation,
  onChange,
  onBlur,
  name,
  hideInput,
}: Props) => {
  return (
    <div className={`form-container-${orientation}`}>
      <div className={`form-label-${orientation}`}>{label}</div>
      <input
        className={`form-text-${orientation}`}
        id={`form-text-${name}`}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        type={hideInput ? "password" : "text"}
      />
    </div>
  );
};
