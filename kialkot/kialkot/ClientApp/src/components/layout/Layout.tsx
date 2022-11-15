import { Outlet } from "react-router-dom";

import Navbar, { NavbarProps } from "../navbar/Navbar";
import SideBand from "../side-band/SideBand";

const Layout = ({ isLoggedIn, setToken }: NavbarProps) => {
  return (
    <div>
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} setToken={setToken} />
      </header>
      <SideBand />
      <div className="MainContainer">
        <Outlet />
      </div>
      <SideBand side="right" />
    </div>
  );
};

export default Layout;