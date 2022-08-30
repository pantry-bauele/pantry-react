import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import "../styles/sass-built/Layout.css";

interface Props {
  loggedIn: boolean;
}
export const Layout = ({ loggedIn }: Props) => {
  return (
    <div id="layout-container">
      <Header loggedIn={loggedIn} siteName="Pantry" />
      <div id="layout-outlet">
        <Outlet />
      </div>
      <div id="layout-navigation-bar">
        <Navbar />
      </div>
    </div>
  );
};
