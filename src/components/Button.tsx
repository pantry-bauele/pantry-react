import { MouseEventHandler } from "react";
import "../styles/sass/Button.css";

interface Props {
  id?: string;
  click?: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const Button = ({ id, click, text }: Props) => {
  return (
    <div id="button-container">
      <button id={id} className="clickable-button" onClick={click}>
        {text}
      </button>
    </div>
  );
};
