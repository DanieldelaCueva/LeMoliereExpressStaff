import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

import classes from "./CustomNavbar.module.css";

import LangDropDown from "../LangDropDown/LangDropDown";

import { useState, useContext } from "react";

import { useTranslation } from "react-i18next";

import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

const CustomNavbar = (props) => {
  const [navExpanded, setNavExpanded] = useState(false);
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const { t } = useTranslation();

  const logoutHandler = () => {
    fetch("http://127.0.0.1:8000/authorization/logout/", {
      method: "DELETE",
      body: JSON.stringify({
        username: JSON.parse(user).username,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(user).token
        }`,
      },
    })
      .then((response) => {
        if (response.ok) {
          history.replace("/login")
          return response.json();
        } else {
          throw new Error("Could not log out");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Navbar
      sticky="top"
      bg="light"
      variant="light"
      expand="xl"
      className={classes.navbar}
      expanded={navExpanded}
    >
      <Container>
        <Navbar.Brand className={classes.title}>
          Le Molière Express
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() =>
            navExpanded ? setNavExpanded(false) : setNavExpanded(true)
          }
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {props.userLoggedIn && (
              <Nav.Item
                bsPrefix="nav-link"
                onClick={() => setNavExpanded(false)}
                className={classes.item}
              >
                <NavLink
                  activeClassName={classes.active}
                  className={classes.link}
                  to="/my-articles"
                >
                  {t("navbar_myarticles")}
                </NavLink>
              </Nav.Item>
            )}
            {props.userLoggedIn && user.group == "Staff" && (
              <Nav.Item
                bsPrefix="nav-link"
                onClick={() => setNavExpanded(false)}
                className={classes.item}
              >
                <NavLink
                  activeClassName={classes.active}
                  className={classes.link}
                  to="/all-articles"
                >
                  {t("navbar_allarticles")}
                </NavLink>
              </Nav.Item>
            )}
            {props.userLoggedIn && user.is_coordinator && (
              <Nav.Item
                bsPrefix="nav-link"
                onClick={() => setNavExpanded(false)}
                className={classes.item}
              >
                <NavLink
                  activeClassName={classes.active}
                  className={classes.link}
                  to="/group-articles"
                >
                  {t("navbar_grouparticles")}
                </NavLink>
              </Nav.Item>
            )}
            {props.userLoggedIn && (
              <Nav.Item
                bsPrefix="nav-link"
                onClick={() => setNavExpanded(false)}
                className={classes.item}
              >
                <NavLink
                  activeClassName={classes.active}
                  className={classes.link}
                  to="/create-article"
                >
                  {t("navbar_createarticle")}
                </NavLink>
              </Nav.Item>
            )}
            {props.userLoggedIn && (
              <Nav.Item bsPrefix="nav-link" className={classes.item}>
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#">
                    <Link className={classes.changepassword} to="/change-password">
                      {t("navbar_changepassword")}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={logoutHandler}>
                    {t("navbar_logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            )}
            <Nav.Item bsPrefix="nav-link">
              <LangDropDown />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
