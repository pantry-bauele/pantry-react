import { Outlet, Link } from "react-router-dom"

function DefaultLayout() {
  return (
    <div>
      <h1>Pantry</h1>
      <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/createItem">Create Item</Link> | {" "}
        <Link to="/viewItems">View Items</Link>
      </nav>
      <Outlet />
      </div>
  );
}

export default DefaultLayout;