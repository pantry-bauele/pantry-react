import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import "../api/AuthenticationService";

import "../styles/sass/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const authenticate = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem(
          "pantry-firebase-credentials",
          JSON.stringify(userCredential)
        );
        navigate("/");
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    if (name === "email") {
      setEmail(target.value);
    } else if (name === "password") {
      setPassword(target.value);
    }
  };

  return (
    <div id="login-container">
      <div id="login-form-container">
        {loginError && (
          <div id="login-error-message">
            Your log in attempt was not successful. Please try again.
          </div>
        )}

        <FormField
          name="email"
          orientation="vertical"
          label="Email Address"
          onChange={handleChange}
        />
        <FormField
          orientation="vertical"
          name="password"
          label="Password"
          onChange={handleChange}
          hideInput={true}
        />
        <Button
          className="brand-button-red button-large clickable-button"
          text="Log In"
          click={authenticate}
        />
        <a
          id="create-account"
          onClick={() => {
            navigate("/createAccount");
          }}
        >
          I don't have an account
        </a>
      </div>
    </div>
  );
};
