import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import classes from "./ArticleCard.module.css";

import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
const ArticleCard = (props) => {
  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);

  const getTwenty = (text) => {
    let new_string = "";
    for (let i = 0; i < 20; i++) {
      if (text.split(" ")[i] !== undefined) {
        new_string = `${new_string}${text.split(" ")[i]} `;
      }
    }
    return `${new_string}...`;
  };

  const onClickAuthor = (author) => {
    props.setTypedSearch(author.toString());
    props.setActualFilter("Auteur");
  };

  const onClickDate = (date) => {
    props.setTypedSearch(date.toString());
    props.setActualFilter("Date");
  };

  const onClickGroup = (group) => {
    props.setTypedSearch(group.toString());
    props.setActualFilter("Rubrique");
  };

  useEffect(() => {
    setValidated(props.article.validated);
  }, []);

  return (
    <Col lg={4} md={6} sm={12}>
      <Card style={{ width: "auto", margin: "2rem 2rem" }}>
        <Card.Img
          variant="top"
          src={props.article.img_url}
          alt="Article image"
        />
        <Card.Body>
          <Card.Title>{props.article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {t("lastarticles_author")}:{" "}
            <a
              className={classes.link}
              href="#filter"
              onClick={() => onClickAuthor(props.article.author)}
            >
              {props.article.author}
            </a>{" "}
            / {t("lastarticles_date")}:{" "}
            <a
              className={classes.link}
              href="#filter"
              onClick={() => onClickDate(props.article.date)}
            >
              {props.article.date}
            </a>{" "}
            / {t("lastarticles_group")}:{" "}
            <a
              className={classes.link}
              href="#filter"
              onClick={() => onClickGroup(props.article.group)}
            >
              {props.article.group}
            </a>
          </Card.Subtitle>
          <Card.Text>{getTwenty(props.article.content)}</Card.Text>
          <Button variant="primary">
            <Link
              className={classes.link_nodec}
              to={`/my-articles/edit/${props.article.id}`}
            >
              {t("articlecard_edit")}
            </Link>
          </Button>
          {props.article.language !== "Español" || (
            <span className={`flag-icon flag-icon-es ${classes.flag}`}></span>
          )}
          {props.article.language !== "English" || (
            <span className={`flag-icon flag-icon-gb ${classes.flag}`}></span>
          )}
          {props.article.language !== "Français" || (
            <span className={`flag-icon flag-icon-fr ${classes.flag}`}></span>
          )}

          {validated && (
            <svg
              style={{
                marginLeft: "0.5rem"
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              fill="green"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ArticleCard;
