import Container from "react-bootstrap/Container";
import classes from "./CreateArticle.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState, useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Helmet } from "react-helmet";

const CreateArticle = (props) => {
  const { t } = useTranslation();

  const history = useHistory();

  const [Terror, setTError] = useState(false);
  const [Aerror, setAError] = useState(false);
  const [Gerror, setGError] = useState(false);
  const [Uerror, setUError] = useState(false);
  const [Lerror, setLError] = useState(false);
  const [Cerror, setCError] = useState(false);

  const enteredTitle = useRef();
  const enteredAuthor = useRef();
  const enteredGroup = useRef();
  const enteredUrl = useRef();
  const enteredLanguage = useRef();
  const enteredContent = useRef();

  useEffect(() => props.setFooterFixed(false), []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      enteredTitle.current.value !== "" &&
      enteredAuthor.current.value !== "" &&
      enteredGroup.current.value !== "" &&
      enteredUrl.current.value !== "" &&
      enteredLanguage.current.value !== "" &&
      enteredContent.current.value !== ""
    ) {
      setTError(false);
      setAError(false);
      setGError(false);
      setUError(false);
      setLError(false);
      setCError(false);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let new_article = {
        id: 6,
        title: enteredTitle.current.value,
        date: date,
        img_url: enteredUrl.current.value,
        content: enteredContent.current.value,
        group: enteredGroup.current.value,
        validated: false,
        creator: JSON.parse(localStorage.getItem("user")).id,
        author: enteredAuthor.current.value,
        language: enteredLanguage.current.value
      };
      fetch("http://127.0.0.1:8000/articles/article-create", {
        method: "POST",
        body: JSON.stringify(new_article),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Could not create article");
          }
        })
        .then((data) => history.replace("/my-articles"))
        .catch((e) => alert(e));
    } else {
      if (enteredTitle.current.value === "") {
        setTError(true);
      }
      if (enteredAuthor.current.value === "") {
        setAError(true);
      }
      if (enteredGroup.current.value === "") {
        setGError(true);
      }
      if (enteredUrl.current.value === "") {
        setUError(true);
      }
      if (enteredLanguage.current.value === "") {
        setLError(true);
      }
      if (enteredContent.current.value === "") {
        setCError(true);
      }
    }
  };

  return (
    <Container style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
      <Helmet>
        <title>LME App | Create Article</title>
        <meta name="description" content="Le Molière Express's app. Page where journalists can create contetn for the website" />
      </Helmet>
      <Form onSubmit={onSubmitHandler}>
        <h3>{t("createarticle_h3")}</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_title")}</Form.Label>
          <Form.Control
            type="text"
            ref={enteredTitle}
            className={Terror && classes.error}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_author")}</Form.Label>
          <Form.Control
            type="text"
            ref={enteredAuthor}
            className={Aerror && classes.error}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_group")}</Form.Label>
          <select
            className={`custom-select custom-select-md ${
              Gerror && classes.error
            }`}
            ref={enteredGroup}
          >
            <option>Actus</option>
            <option>Art et Culture</option>
            <option>Collaborations Externes</option>
            <option>Interviews</option>
            <option>Kesako</option>
            <option>Participaction</option>
            <option>Personnalité du mois</option>
            <option>Science et Technologie</option>
            <option>Scro-gneu-gneu</option>
            <option>Sport</option>
            <option>Thème du mois</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_imgurl")}</Form.Label>
          <Form.Control
            type="url"
            ref={enteredUrl}
            className={Uerror && classes.error}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_language")}</Form.Label>
          <select
            className={`custom-select custom-select-md ${
              Lerror && classes.error
            }`}
            ref={enteredLanguage}
          >
            <option>Français</option>
            <option>Español</option>
            <option>English</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{t("createarticle_content")}</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            ref={enteredContent}
            className={Cerror && classes.error}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("createarticle_submit")}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateArticle;
