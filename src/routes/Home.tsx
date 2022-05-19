import "../styles/sass/Home.css";

import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

interface Props {}

export const Home = () => {
  let navigate = useNavigate();
  const signUp = () => {
    navigate("/createAccount");
  };

  return (
    <div id="home-page-container">
      <div id="hero-container">
        <div id="hero-info-container">
          <div>
            <h2>Take control of your food</h2>
            <h3>Discover the power behind grocery analytics</h3>
          </div>

          <div id="hero-button-container">
            <Button
              id="hero-sign-up-button"
              text="Sign Up"
              click={signUp}
            ></Button>
          </div>
        </div>

        <div id="hero-logo-container">
          <div id="hero-logo"></div>
        </div>
      </div>

      <div id="promo-banner-container">
        <div id="promo-banner-image"></div>
      </div>

      <div id="bottom-action-container">
        <div id="bottom-action-contents">
          <h2>Tired of forgetting what you have at home?</h2>
          <h3>
            Never lose track of your food supply again with our detailed
            tracking software
          </h3>
          <Button
            id="bottom-action-button"
            text="Get Started"
            click={signUp}
          ></Button>
        </div>
      </div>
    </div>
  );
};
