import "../styles/sass/Header.css";

import { Button } from "./Button";
import { Link } from "react-router-dom";

interface Props {
  siteName: string;
  loggedIn: boolean;
}

export const Navbar = ({ siteName, loggedIn }: Props) => {
  return (
    <div id="header-container">
      <div id="header-site-details">
        <Link id="header-logo-link" to="/">
          <div id="header-logo"></div>
          <div id="header-site-name">{siteName}</div>
        </Link>
      </div>
      <div id="header-navigation">
        {loggedIn && (
          <nav>
            <Link to="/logout">
              <Button
                className="brand-button-white button-medium clickable-button"
                text="Log Out"
              ></Button>
            </Link>
          </nav>
        )}

        {!loggedIn && (
          <nav>
            <Link to="/login">
              <Button
                className="brand-button-red button-medium clickable-button"
                text="Log In"
              ></Button>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};
