import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Header = () => {
  return (
    <div>
      <Navbar siteName="Pantry" />
      <Outlet />
    </div>
  );
};
