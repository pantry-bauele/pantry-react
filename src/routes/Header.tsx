import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../styles/sass/Header.css";

interface Props {
  loggedIn: boolean;
}

export const Header = ({ loggedIn }: Props) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} siteName="Pantry" />
      <div id="outlet">
        <Outlet />
      </div>
      <div id="bottomNav">
        <div className="nav-item"></div>
        <div className="nav-item"></div>
        <div className="nav-item"></div>
        <div className="nav-item"></div>
      </div>
    </div>
  );
};
