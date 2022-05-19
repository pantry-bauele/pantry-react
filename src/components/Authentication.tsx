import React from "react";

interface IAuthentication {
  emailAddress: string | null;
}

let AuthenticationContext = React.createContext<IAuthentication>(null!);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let email = localStorage.getItem("loggedIn");
  console.log("AuthService email = ", email);
  let value = { emailAddress: email };
  if (typeof email === "string") {
    value = { emailAddress: email };
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}

export function RequireAuthentication({ children }: { children: JSX.Element }) {
  let auth = useAuthentication();

  let email = auth.emailAddress;
  if (email === "" || email === undefined || email === null) {
    return (
      <div style={{ height: "100vh", padding: "20px" }}>
        <div>You must log in before you can access this page.</div>
      </div>
    );
  }

  return children;
}

export default {};
