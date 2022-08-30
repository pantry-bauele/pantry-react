import React from "react";

import "../styles/sass-built/Authentication.css";

interface IAuthentication {
  emailAddress: string | null;
}

let AuthenticationContext = React.createContext<IAuthentication>(null!);

export const useAuthentication = () => {
  return React.useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let email = localStorage.getItem("pantry-app-loggedIn");
  let value = { emailAddress: email };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const RequireAuthentication = ({
  children,
}: {
  children: JSX.Element;
}) => {
  let auth = useAuthentication();

  let email = auth.emailAddress;
  if (email === "" || email === undefined || email === null) {
    return (
      <div id="authentication-container">
        <div id="authentication-text">
          You must log in before you can access this page.
        </div>
      </div>
    );
  } else {
    return children;
  }
};
