import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { BottomNavbar } from "../components/BottomNavbar";
import "../styles/sass/Layout.css";

interface Props {
  loggedIn: boolean;
}

export const Layout = ({ loggedIn }: Props) => {
  return (
    <div id="layout-container">
      <Navbar loggedIn={loggedIn} siteName="Pantry" />
      <div id="layout-outlet">
        <Outlet />
      </div>
      <div id="layout-navigation-bar">
        <BottomNavbar />
      </div>
    </div>
  );
};
