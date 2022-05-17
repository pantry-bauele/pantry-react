import "../styles/sass/Login.css";

import { useEffect } from "react";
import "../api/AuthenticationService";
import { startLoginUI } from "../api/AuthenticationService";

import { Navbar } from "../components/Navbar";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

export default function Login() {
  /*
    useEffect(() => {
        startLoginUI();
    }, [])

    return (
        <div id="parent">
            <div id="firebaseui-auth-container"></div>
        </div>
    )
    */

  return (
    <div id="login-container">
      <Navbar siteName="Pantry" />
      <div id="login-form-container">
        <FormField label="Email Address" />
        <FormField label="Password" />
        <Button id="login-button" text="Log In" />
        <p>Forgot password</p>
      </div>
    </div>
  );
}
