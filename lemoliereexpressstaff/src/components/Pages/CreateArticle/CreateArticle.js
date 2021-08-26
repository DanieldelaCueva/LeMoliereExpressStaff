import Container from "react-bootstrap/Container";
import classes from "./CreateArticle.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState, useEffect, useRef } from "react";

import { Redirect } from "react-router-dom";

import { useTranslation } from "react-i18next";

const CreateArticle = (props) => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);

  const enteredTitle = useRef();
  const enteredAuthor = useRef();
  const enteredGroup = useRef();
  const enteredUrl = useRef();
  const enteredLanguage = useRef();
  const enteredContent = useRef();

  useEffect(() => {
    props.checkPermissions();
    if (!props.userLoggedIn) {
      setRedirect(true);
    }
  }, []);

  useEffect(() => props.setFooterFixed(false), []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
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
      validated: false,
      creator: JSON.parse(localStorage.getItem("user")).id,
      author: enteredAuthor.current.value,
    };
    console.log(JSON.stringify(new_article));
    fetch('http://127.0.0.1:8000/articles/article-create', {
        method: "POST",
        body: JSON.stringify(new_article),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${JSON.parse(localStorage.getItem("user")).token}`
        }
    }).then(response => {
        if (response.ok){
            return response.json();
        } else {
            throw new Error("Could not create article");
        }
    }).then(data => setRedirect(true))
    .catch(e => alert(e));
  };

  return (
    <Container style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
      <Form onSubmit={onSubmitHandler}>
        <h3>{t("createarticle_h3")}</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_title")}</Form.Label>
          <Form.Control type="text" ref={enteredTitle} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_author")}</Form.Label>
          <Form.Control type="text" ref={enteredAuthor} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_group")}</Form.Label>
          <Form.Control type="text" ref={enteredGroup} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_imgurl")}</Form.Label>
          <Form.Control type="url" ref={enteredUrl} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{t("createarticle_language")}</Form.Label>
          <select
            className="custom-select custom-select-md"
            ref={enteredLanguage}
          >
            <option>Français</option>
            <option>Español</option>
            <option>English</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{t("createarticle_content")}</Form.Label>
          <Form.Control as="textarea" rows={10} ref={enteredContent} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {redirect && <Redirect to="/login" />}
    </Container>
  );
};

export default CreateArticle;