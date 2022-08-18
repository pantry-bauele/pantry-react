import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { CreateItem } from "./routes/CreateItem";
import { Login } from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import { ViewItems } from "./routes/ViewItems";
import { Pantry } from "./routes/Pantry";
import { EditItem } from "./routes/EditItem";
import { Layout } from "./routes/Layout";
import { Home } from "./routes/Home";
import { Logout } from "./routes/Logout";

import {
  AuthenticationProvider,
  RequireAuthentication,
} from "./components/Authentication";

const App = () => {
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem("pantry-app-loggedIn")
  );

  let navigate = useNavigate();

  useEffect(() => {
    console.log("Current user is ", activeUser);

    onAuthStateChanged(getAuth(), (newUser) => {
      if (newUser?.email !== null && newUser?.email !== undefined) {
        setActiveUser(newUser?.email);
        localStorage.setItem("pantry-app-loggedIn", newUser?.email);
      } else {
        setActiveUser(null);
        localStorage.removeItem("pantry-app-loggedIn");
      }
    });
  }, [activeUser, navigate]);

  return (
    <AuthenticationProvider>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Layout loggedIn={activeUser ? true : false} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route
              path="/createItem"
              element={
                <RequireAuthentication>
                  <CreateItem accountEmail={activeUser} />
                </RequireAuthentication>
              }
            />
            <Route
              path="/viewItems"
              element={
                <RequireAuthentication>
                  <ViewItems accountEmail={activeUser} />
                </RequireAuthentication>
              }
            />
            <Route
              path="/pantry"
              element={
                <RequireAuthentication>
                  <Pantry accountEmail={activeUser} />
                </RequireAuthentication>
              }
            />
            <Route
              path="/editItem/:id"
              element={
                <RequireAuthentication>
                  <EditItem accountEmail={activeUser} />
                </RequireAuthentication>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </AuthenticationProvider>
  );
};

export default App;
