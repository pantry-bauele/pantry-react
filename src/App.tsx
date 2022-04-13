import './App.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';

import CreateItem from './routes/CreateItem';
import Login from './routes/Login';
import ViewItems from './routes/ViewItems';
import DefaultLayout from './routes/DefaultLayout';
import Logout from './routes/Logout';

import { AuthenticationProvider, RequireAuthentication } from './components/Authentication';


function App() {
  const [user, setUser] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // If user is not logged in, direct them to login
    // Otherwise, direct them to create an item
    if (localStorage.getItem('user')) {
      if (user === false) {
        setUser(true);
        if (location.pathname !== '/createItem') {
          navigate('/createItem');
        }
      }


    }
    else {
      if (user === true) {
        setUser(false);
      }

      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  })

  return (
    <AuthenticationProvider>
      <div>
        <Routes>
          <Route path="/" element={<DefaultLayout loggedIn={user} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/createItem" element={
              <RequireAuthentication>
                <CreateItem />
              </RequireAuthentication>} />
            <Route path="/viewItems" element={
              <RequireAuthentication>
                <ViewItems accountEmail="hello@y.com" />
              </RequireAuthentication>} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </AuthenticationProvider>
  );
}

export default App;