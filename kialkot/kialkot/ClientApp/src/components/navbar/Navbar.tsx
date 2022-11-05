import { FC } from "react";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../button/Button";
import { getDataFromTokenModel } from "../../util/token";

import classes from "./Navbar.module.scss";
import "./Navbar.scss";
import { string } from "yup";

interface RouteConfig {
  link: string;
  label: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  setToken: (token: null) => void;
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn, setToken }) => {
  const nickName = getDataFromTokenModel("nickName");
  const location = useLocation();
  const routes: RouteConfig[] = [
    {
      link: "/profil",
      label: "Profil",
    },
  ];

  const toImage = (link: string, label: string) => {
      return <img src={require("../../images/nav" + link + ".png")} alt={label} width="100vw" />
  }

  return (
    <nav className={classNames("navbar p-3", [classes.Navbar])}>
      <div
        className={classNames(
          classes.MinWidth0,
          "d-flex align-itmes-center justify-content-between- flex-grow-1 flex-wrap"
        )}
      >
        {isLoggedIn && (
          <div className="d-flex">
            {routes.map(({ link, label}) => (
              <NavLink key={link} to={link} className="nav-link me-4">
                {location.pathname === link ? toImage(link,label) : label}
              </NavLink>
            ))}
          </div>
        )}
        <div
          className={classNames("d-flex align-items-center", classes.MinWidth0)}
        >
          <p className={classNames(classes.Greeting, "mb-0")}>
            Welcome {nickName ? nickName : "to Jó Kérdés App"}
          </p>
          {isLoggedIn && (
            <Button
              onClick={() => setToken(null)}
              color="secondary"
              className="ms-3"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
