import './App.css';
import { Outlet, Link, BrowserRouter, Route, Routes } from "react-router-dom"
import React from 'react';
import CreateItem from './routes/CreateItem';
import Login from './routes/Login';
import ViewItems from './routes/ViewItems';
import DefaultLayout from './routes/DefaultLayout';
import {AuthenticationProvider, RequireAuthentication} from './components/Authentication';

function App() {
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
