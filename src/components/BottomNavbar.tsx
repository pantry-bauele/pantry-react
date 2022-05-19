import "../styles/sass/BottomNavbar.css";

import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";

interface Props {}

export const BottomNavbar = ({}: Props) => {
  const renderLogButton = () => {};

  let navigate = useNavigate();

  const navigatePantry = () => {
    navigate("/placeHolder");
  };

  const navigateItems = () => {
    navigate("/viewItems");
  };

  const navigateCreate = () => {
    navigate("/createItem");
  };

  const navigateTimeline = () => {
    navigate("/placeHolder");
  };

  const navigateCart = () => {
    navigate("/placeHolder");
  };
  return (
    <div id="bottom-navbar-container">
      <div className="nav-item" onClick={navigatePantry}>
        <div id="nav-pantry"></div>
        <div>Pantry</div>
      </div>
      <div className="nav-item" onClick={navigateItems}>
        <div id="nav-items"></div>
        <div>Items</div>
      </div>

      <div className="nav-item" onClick={navigateCreate}>
        <div id="nav-add">+</div>
      </div>

      <div className="nav-item" onClick={navigateTimeline}>
        <div id="nav-timeline"></div>
        <div>Timeline</div>
      </div>

      <div className="nav-item" onClick={navigateCart}>
        <div id="nav-cart"></div>
        <div>Cart</div>
      </div>
    </div>
  );
};
