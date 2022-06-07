import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import CreateItem from "./routes/CreateItem";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import ViewItems from "./routes/ViewItems";
import EditItem from "./routes/EditItem";
import { Header } from "./routes/Header";
import { Home } from "./routes/Home";
import Logout from "./routes/Logout";
import { Placeholder } from "./routes/Placeholder";

import {
  AuthenticationProvider,
  RequireAuthentication,
} from "./components/Authentication";

function App() {
  const [activeUser, setUser] = useState(localStorage.getItem("loggedIn"));
  const [connectedToServer, setConnectedToServer] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect, [activeUser]");
    console.log("Current user is ", activeUser);

    onAuthStateChanged(getAuth(), (user) => {
      console.log("Auth state chaged in App()");
      if (user?.email !== null && user?.email !== undefined) {
        setUser(user?.email);
        localStorage.setItem("loggedIn", user?.email);
      } else {
        setUser(null);
        localStorage.removeItem("loggedIn");
      }

      if (activeUser === "" || activeUser === null) {
        //navigate('/login');
      }
    });
  }, [activeUser, navigate]);

  return (
    <AuthenticationProvider>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Header loggedIn={activeUser ? true : false} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/placeHolder" element={<Placeholder />} />
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
}

export default App;
