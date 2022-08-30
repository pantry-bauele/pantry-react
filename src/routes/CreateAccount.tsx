import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AccountCreator } from "../api/AccountCreator";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import "../api/AuthenticationService";

import "../styles/sass-built/CreateAccount.css";

export const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountError, setAccountError] = useState(0);
  const [activeUser, setUser] = useState(
    localStorage.getItem("pantry-app-loggedIn")
  );

  const navigate = useNavigate();

  const createAccount = async () => {
    // Validate all the user-supplied fields
    let validationErrorCode = validateFields();
    if (validationErrorCode) {
      setAccountError(validationErrorCode);
      return;
    }

    // Attempt to create the account
    let accountCreator = new AccountCreator();
    let accountCreationErrorCode = await accountCreator.createAccount(
      firstName,
      lastName,
      email,
      password
    );

    if (accountCreationErrorCode === 0) {
      // Account creation was successful, direct to new screen
      navigate("/viewItems");

      // AccountCreator might return various error codes depending on
      // what happened with the Authentication Provider.
    } else if (accountCreationErrorCode === 1) {
      setAccountError(6);
    } else if (accountCreationErrorCode === 2) {
      setAccountError(7);
    } else if (accountCreationErrorCode === 3) {
      setAccountError(8);
    } else if (accountCreationErrorCode === -1) {
      setAccountError(9);
    }
  };

  const validateFields = () => {
    if (firstName.length === 0 || lastName.length === 0) {
      return 1;
    } else if (email.length === 0) {
      return 2;
    } else if (password.length === 0) {
      return 3;
    } else if (confirmPassword.length === 0) {
      return 4;
    } else if (password !== confirmPassword) {
      return 5;
    }
  };

  const renderLoginError = () => {
    if (accountError) {
      let errorMessage;
      switch (accountError) {
        case 1:
          errorMessage = "Please enter your first and last name.";
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
          errorMessage =
            "Authentication provider error. Please try again later.";
          break;
        case 7:
          errorMessage = "Please enter a valid email address.";
          break;
        case 8:
          errorMessage = "Please enter a password with at least 6 characters.";
          break;
        case 9:
          errorMessage = "That email address is already registered.";
          break;
      }
      return <div id="create-account-error-message">{errorMessage}</div>;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    if (name === "firstname") {
      setFirstName(target.value);
    }
    if (name === "lastname") {
      setLastName(target.value);
    } else if (name === "email") {
      setEmail(target.value);
    } else if (name === "password") {
      setPassword(target.value);
    } else if (name === "cofirmPassword") {
      setConfirmPassword(target.value);
    }
  };

  useEffect(() => {
    // If user lands on this page while already being logged in,
    // redirect them to their item page.
    if (activeUser !== null && activeUser !== undefined) {
      navigate("/viewItems");
    }
  }, []);

  return (
    <div id="create-account-container">
      <div id="create-account-parent">
        {renderLoginError()}
        <FormField
          name="firstname"
          orientation="vertical"
          label="First Name"
          onChange={handleChange}
        />
        <FormField
          name="lastname"
          orientation="vertical"
          label="Last Name"
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
        <Button
          id="create-account-button"
          className="brand-button-red button-large clickable-button button-top-margin"
          text="Create Account"
          click={createAccount}
        />
      </div>
    </div>
  );
};
