import "../styles/sass/Login.css";

import { useState } from "react";
import "../api/AuthenticationService";
import { AccountCreator } from "../api/AccountCreator";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import { serverSingleton } from "../api/ServerAPI";

export default function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountError, setAccountError] = useState(0);

  const navigate = useNavigate();

  const createAccount = async () => {
    if (firstName.length === 0) {
      setAccountError(1);
    } else if (email.length === 0) {
      setAccountError(2);
    } else if (password.length === 0) {
      setAccountError(3);
    } else if (confirmPassword.length === 0) {
      setAccountError(4);
    } else if (password !== confirmPassword) {
      setAccountError(5);
    } else {
      setAccountError(0);
    }

    if (accountError === 0) {
      let accountCreator = new AccountCreator();
      let errorCode = await accountCreator.createAccount(
        firstName,
        "NULL",
        email,
        password
      );

      if (errorCode === 1) {
        setAccountError(6);
      } else if (errorCode === 2) {
        setAccountError(7);
      } else if (errorCode === 3) {
        setAccountError(8);
      }
    }
  };

  const renderLoginError = () => {
    let errorMessage;

    switch (accountError) {
      case 1:
        errorMessage = "Please enter a name.";
        break;
      case 2:
        errorMessage = "Please enter an email address.";
        break;
      case 3:
        errorMessage = "Please enter a passwoord.";
        break;
      case 4:
        errorMessage = "Please confirm your password.";
        break;
      case 5:
        errorMessage = "Your passwords do not match.";
        break;
      case 6:
        errorMessage = "Authentication provider error. Please try again later.";
        break;
      case 7:
        errorMessage = "Please enter a valid email address.";
        break;
      case 8:
        errorMessage = "Please enter a password with at least 6 characters.";
        break;
      case 9:
        errorMessage = "Unknown error. Please try again later.";
        break;
    }

    if (accountError) {
      return <div id="login-error-message">{errorMessage}</div>;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    if (name === "firstname") {
      setFirstName(target.value);
    } else if (name === "email") {
      setEmail(target.value);
    } else if (name === "password") {
      setPassword(target.value);
    } else if (name === "cofirmPassword") {
      setConfirmPassword(target.value);
    }
  };

  return (
    <div id="login-container">
      <div id="login-form-container">
        {renderLoginError()}
        <FormField
          name="firstname"
          orientation="vertical"
          label="First Name"
          onChange={handleChange}
        />
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
        <FormField
          orientation="vertical"
          name="cofirmPassword"
          label="Confirm Password"
          onChange={handleChange}
          hideInput={true}
        />
        <Button id="login-button" text="Create Account" click={createAccount} />
      </div>
    </div>
  );
}
