import ReactDOM from "react-dom";
import "../styles/sass/Modal.css";

interface Props {
  isOpen: boolean;
  children?: JSX.Element;
}

export const Modal = ({ isOpen, children }: Props) => {
  const modalRender = <div id="modal-container">{children}</div>;

  const modalElement = document.querySelector("#modal-root");
  const rootElement = document.getElementById("root");

  if (!isOpen || modalElement === null) {
    if (rootElement !== null) {
      rootElement.style.filter = "opacity(100%)";
    }
    document.body.style.overflow = "visible";
    return null;
  }

  const portal = ReactDOM.createPortal(modalRender, modalElement);
  if (portal === undefined) return null;

  if (isOpen && rootElement !== null) {
    rootElement.style.filter = "opacity(50%)";
    document.body.style.overflow = "hidden";
  }

  return portal;
};
