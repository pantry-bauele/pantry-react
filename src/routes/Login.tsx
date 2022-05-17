import "../styles/sass/Login.css";

import { useState } from "react";
import "../api/AuthenticationService";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const authenticate = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(true);
      });
  };

  const renderLoginError = () => {
    if (loginError) {
      console.log("show");
      return (
        <div id="login-error-message">
          Your log in attempt was not successful. Please try again.
        </div>
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    if (name === "email") {
      setEmail(target.value);
      console.log(target.value);
    } else if (name === "password") {
      setPassword(target.value);
      console.log(target.value);
    }
  };

  return (
    <div id="login-container">
      <div id="login-form-container">
        {renderLoginError()}
        <FormField name="email" label="Email Address" onChange={handleChange} />
        <FormField
          name="password"
          label="Password"
          onChange={handleChange}
          hideInput={true}
        />
        <Button id="login-button" text="Log In" click={authenticate} />
        <p>Forgot password</p>
      </div>
    </div>
  );
}
