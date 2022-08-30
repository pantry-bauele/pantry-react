import { MouseEventHandler } from "react";
import "../styles/sass-built/Button.css";

interface Props {
  id?: string;
  className?: string;
  click?: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const Button = ({ id, className, click, text }: Props) => {
  return (
    <div id="button-container">
      <button id={id} className={className} onClick={click}>
        {text}
      </button>
    </div>
  );
};
