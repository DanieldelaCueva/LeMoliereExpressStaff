import { useEffect, useRef, useState, useContext } from "react";
import Container from "react-bootstrap/Container";

import classes from "./Login.module.css";

import { useTranslation } from "react-i18next";

import { useHistory } from "react-router-dom";

import { Helmet } from "react-helmet";
import AuthContext from "../../../store/auth-context";

const Login = (props) => {
  const { t } = useTranslation();

  const usernameInput = useRef();
  const passwordInput = useRef();

  const history = useHistory();

  const [error, setError] = useState("");

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    props.setFooterFixed(true);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    setError("");
    const enteredUsername = usernameInput.current.value;
    const enteredPassword = passwordInput.current.value;

    fetch("http://127.0.0.1:8000/authorization/login/", {
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
        let userData = {};
        userData.token = data.token;
        fetch(`http://127.0.0.1:8000/authorization/user-detail/${enteredUsername}`)
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
            userData.id = data.id;
            userData.username = enteredUsername;
            userData.name = `${data.first_name} ${data.last_name}`;
            userData.group = data.group;
            userData.is_coordinator = data.is_coordinator;
            authCtx.login(userData);
            history.replace("/my-articles");
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  return (
    <Container className={classes.container}>
      <Helmet>
        <title>LME App | Login</title>
        <meta
          name="description"
          content="Le Molière Express's app login page"
        />
      </Helmet>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>{t("login_signin")}</h3>

        <div className="form-group">
          <label>{t("login_username")}</label>
          <input
            type="text"
            className={`form-control ${error !== "" && classes.error}`}
            placeholder={t("login_enterusername")}
            required
            ref={usernameInput}
          />
        </div>

        <div className="form-group">
          <label>{t("login_password")}</label>
          <input
            type="password"
            className={`form-control ${error !== "" && classes.error}`}
            placeholder={t("login_enterpassword")}
            required
            ref={passwordInput}
          />
        </div>

        <p className="forgot-password text-right" style={{ color: "red" }}>
          {error}
        </p>

        <button type="submit" className="btn btn-primary btn-block">
          {t("login_submit")}
        </button>
      </form>
    </Container>
  );
};

export default Login;
