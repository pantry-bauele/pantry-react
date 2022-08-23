import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validMeasurementUnit } from "../pantry-shared/src/measurementUnits";

import "../styles/sass/Navbar.css";

export const Navbar = () => {
  let navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(document.createElement("div"));

  function setTab(event: React.MouseEvent<HTMLDivElement>) {
    console.log("setTab called");

    let previousTarget = selectedTab;
    let currentTarget = event.currentTarget;
    console.log("previousTarget = ", previousTarget);
    console.log("currentTarget = ", currentTarget);

    previousTarget.classList.remove("navbar-item-selected");
    currentTarget.classList.add("navbar-item-selected");

    setSelectedTab(currentTarget);
  }

  return (
    <div id="navbar-container">
      <div
        className="navbar-item"
        onClick={(event) => {
          setTab(event);
          navigate("/pantry");
        }}
      >
        <div className="navbar-item-icon" id="navbar-pantry"></div>
        <div>Pantry</div>
      </div>

      <div id="navbar-create-item-container">
        <div
          id="navbar-create-item"
          onClick={(event) => {
            setTab(event);
            navigate("/createItem");
          }}
        >
          +
        </div>
      </div>

      <div
        className="navbar-item"
        onClick={(event) => {
          setTab(event);
          navigate("/viewItems");
        }}
      >
        <div className="navbar-item-icon" id="navbar-view-items"></div>
        <div>Items</div>
      </div>
    </div>
  );
};
