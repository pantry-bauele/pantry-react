import "../styles/sass/Navbar.css";

import { Button } from "./Button";
import { Link } from "react-router-dom";

interface Props {
  siteName: string;
}

export const Navbar = ({ siteName }: Props) => {
  return (
    <div id="navbar-container">
      <div id="navbar-site-details">
        <div id="navbar-logo"></div>
        <div id="navbar-site-name">{siteName}</div>
      </div>
      <div id="navbar-navigation">
        <nav>
          <Link to="/login">
            <Button id="navbar-log-in-button" text="Log In"></Button>
          </Link>
        </nav>
      </div>
    </div>
  );
};
