import { useEffect, useRef, useState } from "react";

import Container from "react-bootstrap/Container";

import classes from "./Login.module.css";
import { Redirect } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const Login = (props) => {
  const { t } = useTranslation();

  const usernameInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    props.setFooterFixed(true);
  }, []);

  useEffect(() => {
    const stored_user = localStorage.getItem("user");
    if (stored_user) {
      const parsed_user = JSON.parse(stored_user);
      if (parsed_user.isLoggedIn) {
        setRedirect(true);
      }
    }
  }, []);

  useEffect(() => props.checkPermissions(), [])

  const submitHandler = (event) => {
    event.preventDefault();
    setError("");
    const enteredUsername = usernameInput.current.value;
    const enteredPassword = passwordInput.current.value;

    fetch("https://moliereexpressapi.pythonanywhere.com/authorization/login/", {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Username or password are incorrect");
        }
      })
      .then((data) => {
        let user = data;
        fetch(
          `https://moliereexpressapi.pythonanywhere.com/authorization/user-detail/${enteredUsername}`
        )
          .then((response) => {
            if (response.ok) {
              if (response !== {}) {
                return response.json();
              } else {
                throw new Error("Could not retrieve user info");
              }
            } else {
              throw new Error("Could not retrieve user info");
            }
          })
          .then((data) => {
            user.id = data.id;
            user.username = enteredUsername;
            user.name = `${data.first_name} ${data.last_name}`;
            user.group = data.group;
            user.is_coordinator = data.is_coordinator;
            user.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(user));
            setRedirect(true);
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container className={classes.container}>
      <Helmet>
        <title>LME App | Login</title>
        <meta name="description" content="Le Molière Express's app login page" />
      </Helmet>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>{t('login_signin')}</h3>

        <div className="form-group">
          <label>{t('login_username')}</label>
          <input
            type="text"
            className={`form-control ${error !== "" && classes.error}`}
            placeholder={t('login_enterusername')}
            required
            ref={usernameInput}
          />
        </div>

        <div className="form-group">
          <label>{t('login_password')}</label>
          <input
            type="password"
            className={`form-control ${error !== "" && classes.error}`}
            placeholder={t('login_enterpassword')}
            required
            ref={passwordInput}
          />
        </div>

        <p className="forgot-password text-right" style={{ color: "red" }}>
          {error}
        </p>

        <button type="submit" className="btn btn-primary btn-block">
        {t('login_submit')}
        </button>
      </form>
      {redirect && <Redirect to="my-articles"/>}
    </Container>
  );
};

export default Login;
