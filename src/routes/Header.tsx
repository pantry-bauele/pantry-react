import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface Props {
  loggedIn: boolean;
}

export const Header = ({ loggedIn }: Props) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} siteName="Pantry" />
      <Outlet />
    </div>
  );
};
