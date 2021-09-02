import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import classes from "./ChangePassword.module.css";

import { useRef, useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const ChangePassword = (props) => {
  const { t } = useTranslation();

  const newPassword = useRef();
  const reNewPassword = useRef();

  const [errorPass, setErrorPass] = useState(false);
  const [errorChar, setErrorChar] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setRedirect(true);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.setFooterFixed(true);
  }, [props]);

  useEffect(() => {
    props.checkPermissions();
    if (!props.userLoggedIn) {
      setRedirect(true);
    }
  }, []);

  const submitHandler = (e) => {
    const format = /[!#$%^&*()\=\[\]{};':"\\|,<>\/?]+/;
    e.preventDefault();
    if (newPassword.current.value === reNewPassword.current.value) {
      setErrorPass(false);
      if (
        !format.test(newPassword.current.value) &&
        newPassword.current.value.length < 150 &&
        newPassword.current.value.length > 0
      ) {
        fetch(
          `https://moliereexpressapi.pythonanywhere.com/authorization/change-password/${
            JSON.parse(localStorage.getItem("user")).username
          }`,
          {
            method: "POST",
            body: JSON.stringify({
              username: JSON.parse(localStorage.getItem("user")).username,
              password: newPassword.current.value,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to change password");
            }
          })
          .catch((e) => console.error(e));
        localStorage.removeItem("user");
        handleShow();
      } else {
        setErrorChar(true);
      }
    } else {
      setErrorPass(true);
    }
  };

  return (
    <Container style={{ marginTop: "1.5rem", marginBottom: "1.5rem", height: "100%"}}>
      <Helmet>
        <title>LME App | Change Password</title>
        <meta name="description" content="Le Molière Express's app change password page" />
      </Helmet>
      <Form onSubmit={submitHandler} style={{ marginTop: "9rem"}}>
        <h3>{t('password_changepassword')}</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{t('password_newpassword')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('password_newpassword')}
            className={(errorPass || errorChar) && classes.error}
            ref={newPassword}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t('password_retype')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('password_newpassword')}
            className={(errorPass || errorChar) && classes.error}
            ref={reNewPassword}
          />
          {errorPass && (
            <Form.Text style={{ color: "red" }}>
              {t('password_besame')}
            </Form.Text>
          )}
          {errorChar && (
            <Form.Text style={{ color: "red" }}>{t('password_invalid')}</Form.Text>
          )}
        </Form.Group>
        <Button variant="outline-secondary">
          <Link className={classes.cancel} to="/login">
          {t('password_cancel')}
          </Link>
        </Button>
        <Button variant="primary" type="submit" style={{ marginLeft: "1rem" }}>
        {t('password_submit')}
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p className={classes.modal_p}>{t('password_changedsuccessfuly')}</p>
          <Button
            variant="primary"
            onClick={handleClose}
            className={classes.modal_button}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>

      {redirect && <Redirect to="/login" />}
    </Container>
  );
};

export default ChangePassword;
