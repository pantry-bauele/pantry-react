import { Outlet, Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

interface Props {
  loggedIn: boolean;
}

function DefaultLayout(props: Props) {
  let navigate = useNavigate();

  const [logged, setLogged] = useState(props.loggedIn); 

  useEffect(() => {
    setLogged(props.loggedIn);
  })

  function renderNav() {
    if (logged) {
      return (
        <nav>
        <Link to="/createItem">Create Item</Link> | {" "}
        <Link to="/viewItems">View Items</Link> | {" "}
        <Link to="/logout"> Logout </Link>
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