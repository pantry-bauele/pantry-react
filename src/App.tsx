import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import CreateItem from './routes/CreateItem';
import Login from './routes/Login';
import ViewItems from './routes/ViewItems';
import DefaultLayout from './routes/DefaultLayout';
import Logout from './routes/Logout';

import { AuthenticationProvider, RequireAuthentication } from './components/Authentication';

function App() {
  const [activeUser, setUser] = useState(localStorage.getItem('loggedIn'));

  let navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect, [activeUser]');
    console.log('Current user is ', activeUser);

    onAuthStateChanged(getAuth(), (user) => {
      console.log('Auth state chaged in App()');
      if (user?.email !== null && user?.email !== undefined) {
        setUser(user?.email);
        localStorage.setItem('loggedIn', user?.email);
      }
      else {
        setUser(null);
        localStorage.removeItem('loggedIn');
      }

      if (activeUser === '' || activeUser === null) {
        navigate('/login');
      }
    });
  }, [activeUser, navigate]);

  return (
    <AuthenticationProvider>
      <div>
        <Routes>
          <Route path="/" element={<DefaultLayout loggedIn={activeUser} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/createItem" element={
              <RequireAuthentication>
                <CreateItem />
              </RequireAuthentication>} />
            <Route path="/viewItems" element={
              <RequireAuthentication>
                <ViewItems accountEmail={activeUser} />
              </RequireAuthentication>} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </AuthenticationProvider>
  );
}

export default App;