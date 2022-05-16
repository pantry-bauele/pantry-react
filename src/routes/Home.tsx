import "../styles/sass/Home.css";

import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";

interface Props {}

export const Home = ({}: Props) => {
  return (
    <div id="home-container">
      <Navbar siteName="Pantry" />
      <div id="action-banner-container">
        <div id="action-banner-info-container">
          <div id="action-banner-info-headings">
            <h2>Take control of your food</h2>
            <h3>Discover the power behind grocery analytics</h3>
          </div>

          <div id="action-banner-button-container">
            <Button id="action-banner-info-button" text="Sign Up"></Button>
          </div>
        </div>
        <div id="action-banner-logo-container">
          <div id="action-banner-logo"></div>
        </div>
      </div>
      <div id="promo-banner-container">
        <div id="promo-banner-image"></div>
      </div>

      <div id="last-action-container">
        <h2>Tired of forgetting what you have at home?</h2>
        <h3>
          Never lose track of your food supply again with our detailed tracking
          software
        </h3>
        <Button id="last-action-button" text="Get Started"></Button>
      </div>
    </div>
  );
};
