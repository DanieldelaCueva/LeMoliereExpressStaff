import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

import classes from "./CustomNavbar.module.css";

import LangDropDown from "../LangDropDown/LangDropDown";

import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { Redirect } from "react-router-dom";

import { NavLink } from "react-router-dom";

const CustomNavbar = (props) => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const stored_user = localStorage.getItem("user");
    if (stored_user) {
      setUser(JSON.parse(stored_user));
    }
  }, [props]);

  const logoutHandler = () => {
    fetch('http://127.0.0.1:8000/authorization/logout/', {
      method: 'DELETE',
      body: JSON.stringify({
        username: JSON.parse(localStorage.getItem("user")).username
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}`
      }
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem("user");
        setRedirect(true);
        return(response.json());
      } else {
        throw new Error("Could not log out");
      }
    })
    .catch(e => console.log(e));
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
              <Nav.Item
                bsPrefix="nav-link"
                className={classes.item}
              >
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#">{t('navbar_changepassword')}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={logoutHandler}>{t('navbar_logout')}</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            )}
            <Nav.Item bsPrefix="nav-link">
              <LangDropDown />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {redirect && <Redirect to="/login"/>}
    </Navbar>
  );
};

export default CustomNavbar;
