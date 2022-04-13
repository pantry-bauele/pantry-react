import './App.css';
import { Outlet, Link, BrowserRouter, Route, Routes } from "react-router-dom"
import React, { useEffect } from 'react';
import CreateItem from './routes/CreateItem';
import Login from './routes/Login';
import ViewItems from './routes/ViewItems';
import DefaultLayout from './routes/DefaultLayout';
import { AuthenticationProvider, RequireAuthentication } from './components/Authentication';

import { userEmail, getCurrentUser, authEmitter } from "./api/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// When notified that a login event has happened,
// poll the AuthenticationService for the new login 
authEmitter.on('authChanged', () => {
  console.log('authChanged received!');
  console.log('Current authenticated user = ', getCurrentUser());
})

function App() {
  let navigate = useNavigate();

  function requireLogin() {

  }

  useEffect(() => {
    requireLogin();
    navigate('/login');

}, [])

return (
  <AuthenticationProvider>
  <div>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/createItem" element={
            <RequireAuthentication>
            <CreateItem />
            </RequireAuthentication>} />
        <Route path="/viewItems" element={
          <RequireAuthentication>
          <ViewItems accountEmail="hello@y.com"/>
          </RequireAuthentication>} />
      </Route>
    </Routes>
    </div>
  </AuthenticationProvider>
   );
   
}

export default App;
