import { useEffect, useRef, useState, useContext } from "react";
import Container from "react-bootstrap/Container";

import classes from "./Login.module.css";

import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";
import AuthContext from "../../../store/auth-context";

const Login = (props) => {
  const { t } = useTranslation();

  const usernameInput = useRef();
  const passwordInput = useRef();

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

    authCtx.login(enteredUsername, enteredPassword);
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
    </Container>
  );
};

export default Login;
