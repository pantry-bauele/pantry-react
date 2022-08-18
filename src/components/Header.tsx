import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { Link } from "react-router-dom";

import "../styles/sass/Header.css";

interface Props {
  siteName: string;
  loggedIn: boolean;
}

export const Header = ({ siteName, loggedIn }: Props) => {
  let navigate = useNavigate();

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
          <Button
            className="brand-button-white button-medium clickable-button"
            text="Log Out"
            click={() => navigate("/logout")}
          ></Button>
        )}

        {!loggedIn && (
          <Button
            className="brand-button-red button-medium clickable-button"
            text="Log In"
            click={() => navigate("/login")}
          ></Button>
        )}
      </div>
    </div>
  );
};
