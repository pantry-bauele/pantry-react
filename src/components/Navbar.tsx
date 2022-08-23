import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/sass/Navbar.css";

export const Navbar = () => {
  let navigate = useNavigate();
  let { pathname } = useLocation();

  const [selectedTab, setSelectedTab] = useState(
    document.createElement("null")
  );

  useEffect(() => {
    if (selectedTab.id) {
      selectedTab.classList.remove("navbar-item-selected");
      console.log("true");
    }

    let target;
    if (pathname === "/viewItems") {
      target = document.getElementById("navbar-view-items-container");
    } else if (pathname == "/pantry") {
      target = document.getElementById("navbar-pantry-container");
    }

    if (!target) {
      return;
    }

    target.classList.add("navbar-item-selected");
    setSelectedTab(target);
  });

  return (
    <div id="navbar-container">
      <div
        id="navbar-pantry-container"
        className="navbar-item"
        onClick={() => {
          navigate("/pantry");
        }}
      >
        <div className="navbar-item-icon" id="navbar-pantry"></div>
        <div>Pantry</div>
      </div>

      <div id="navbar-create-item-container">
        <div
          id="navbar-create-item"
          onClick={() => {
            navigate("/createItem");
          }}
        >
          +
        </div>
      </div>

      <div
        id="navbar-view-items-container"
        className="navbar-item"
        onClick={() => {
          navigate("/viewItems");
        }}
      >
        <div className="navbar-item-icon" id="navbar-view-items"></div>
        <div>Items</div>
      </div>
    </div>
  );
};
