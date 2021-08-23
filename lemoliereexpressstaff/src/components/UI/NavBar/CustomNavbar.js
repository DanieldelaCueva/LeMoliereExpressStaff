import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import classes from './CustomNavbar.module.css';

import LangDropDown from "../LangDropDown/LangDropDown";

import { useState } from "react";

import { useTranslation } from "react-i18next";

import { NavLink } from 'react-router-dom';

const CustomNavbar = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  const { t } = useTranslation();

  return (
    <Navbar sticky="top" bg="light" variant="light" expand="xl" className={classes.navbar} expanded={navExpanded}>
      <Container>
        <Navbar.Brand style={{fontSize: "2rem"}}>Le Molière Express</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => navExpanded ? setNavExpanded(false) : setNavExpanded(true)}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item bsPrefix="nav-link" onClick={() => setNavExpanded(false)} className={classes.item}><NavLink activeClassName={classes.active} className={classes.link} to="/my-articles">{t('navbar_myarticles')}</NavLink></Nav.Item>
            <Nav.Item bsPrefix="nav-link"><LangDropDown /></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
