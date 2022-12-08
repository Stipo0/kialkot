import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

import Navbar, { NavbarProps } from "../navbar/Navbar";
import Background from "../background/Background";

import "./Layout.scss";

const Layout = ({ isLoggedIn, setToken }: NavbarProps) => {
  return (
    <div>
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} setToken={setToken} />
      </header>
      <Background />
      <div className="MainContainer pb-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;