import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import "../styles/sass/Header.css";

interface Props {
  loggedIn: boolean;
}

export const Header = ({ loggedIn }: Props) => {
  return (
    <div id="page-layout-container">
      <Navbar loggedIn={loggedIn} siteName="Pantry" />
      <div id="outlet">
        <Outlet />
      </div>
      <div id="bottom-nav">
        <BottomNavbar />
      </div>
    </div>
  );
};
