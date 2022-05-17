import { ChangeEventHandler } from "react";
import "../styles/sass/FormField.css";

interface Props {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  hideInput?: boolean;
}

export const FormField = ({ label, onChange, id, name, hideInput }: Props) => {
  return (
    <div id="form-container">
      <div id="form-label">{label}</div>
      <input
        id="form-text"
        name={name}
        onChange={onChange}
        type={hideInput ? "password" : "text"}
      />
    </div>
  );
};
