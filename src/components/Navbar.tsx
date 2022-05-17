import "../styles/sass/Navbar.css";

import { Button } from "./Button";
import { Link } from "react-router-dom";

interface Props {
  siteName: string;
  loggedIn: boolean;
}

export const Navbar = ({ siteName, loggedIn }: Props) => {
  const renderLogButton = () => {
    if (loggedIn) {
      return (
        <nav>
          <Link to="/logout">
            <Button id="navbar-log-button" text="Log Out"></Button>
          </Link>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/login">
            <Button id="navbar-log-button" text="Log In"></Button>
          </Link>
        </nav>
      );
    }
  };

  return (
    <div id="navbar-container">
      <div id="navbar-site-details">
        <Link id="navbar-logo-link" to="/">
          <div id="navbar-logo"></div>
          <div id="navbar-site-name">{siteName}</div>
        </Link>
      </div>
      <div id="navbar-navigation">{renderLogButton()}</div>
    </div>
  );
};
