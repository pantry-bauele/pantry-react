import "../styles/sass/FormField.css";

interface Props {
  id?: string;
  label: string;
}

export const FormField = ({ id, label }: Props) => {
  return (
    <div id="form-container">
      <div id="form-label"> {label}</div>
      <div id="form-text">Value</div>
    </div>
  );
};
