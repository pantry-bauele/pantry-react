import "../styles/sass/Home.css";

import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {
  let navigate = useNavigate();

  const redirectToSignUp = () => {
    navigate("/createAccount");
  };

  return (
    <div id="home-page-container">
      <div id="hero-promo-banner-horizontal-container">
        <div id="hero-container">
          <div id="hero-info-container">
            <div>
              <h2>Take control of your food</h2>
              <h3>Discover the power behind grocery analytics</h3>
            </div>

            <div id="hero-button-container">
              <Button
                className="brand-button-white button-medium clickable-button"
                text="Sign Up"
                click={redirectToSignUp}
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
      </div>

      <div id="bottom-action-container">
        <div id="bottom-action-contents">
          <h2>Tired of forgetting what you have at home?</h2>
          <h3>
            Never lose track of your food supply again with our detailed
            tracking software
          </h3>
          <Button
            className="brand-button-red button-large clickable-button"
            text="Get Started"
            click={redirectToSignUp}
          ></Button>
        </div>
      </div>
    </div>
  );
};
