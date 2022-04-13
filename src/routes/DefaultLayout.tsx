import { Outlet, Link } from "react-router-dom"
import { userEmail, signOut } from '../api/AuthenticationService';
import { useNavigate } from 'react-router-dom';

function DefaultLayout() {
  let navigate = useNavigate();

  function logout() {
    console.log('Aha!');
    signOut();
    navigate('/');
  }

  function renderNav() {
    if (userEmail != '') {
      return (
        <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/createItem">Create Item</Link> | {" "}
        <Link to="/viewItems">View Items</Link> | {" "}
        <a onClick={logout}> Logout </a>
      </nav>
      )
    }
  }

  return (
    <div>
      <h1>Pantry</h1>
        { renderNav() }
      <Outlet />
      </div>
  );
}

export default DefaultLayout;