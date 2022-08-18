import { useNavigate } from "react-router-dom";

import "../styles/sass/Navbar.css";

export const Navbar = () => {
  let navigate = useNavigate();

  return (
    <div id="navbar-container">
      <div className="navbar-item" onClick={() => navigate("/pantry")}>
        <div className="navbar-item-icon" id="navbar-pantry"></div>
        <div>Pantry</div>
      </div>

      <div className="navbar-item" onClick={() => navigate("/createItem")}>
        <div id="navbar-create-item">+</div>
      </div>

      <div className="navbar-item" onClick={() => navigate("/viewItems")}>
        <div className="navbar-item-icon" id="navbar-view-items"></div>
        <div>Items</div>
      </div>
    </div>
  );
};
