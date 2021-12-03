import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import classes from "./ArticleCard.module.css";

import { useTranslation } from "react-i18next";

import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../../store/auth-context";

const ArticleCard = (props) => {
  const { t } = useTranslation();

  const authCtx = useContext(AuthContext);

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
  }, [props.article.validated]);

  const performValidation = () => {
    if (validated) {
      fetch(
        `https://moliereexpressapi.pythonanywhere.com/articles/article-invalidate/${props.article.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authCtx.user.token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Could not invalidate article");
          }
        })
        .catch((e) => console.error(e));
    } else {
      fetch(
        `https://moliereexpressapi.pythonanywhere.com/articles/article-validate/${props.article.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authCtx.user.token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Could not validate article");
          }
        })
        .catch((e) => console.error(e));
    }
  };

  const validateHandler = () => {
    if (
      authCtx.user.group === "Staff" ||
      authCtx.user.is_coordinator
    ) {
      if (validated) {
        setValidated(false);
        performValidation();
      } else {
        setValidated(true);
        performValidation();
      }
    }
  };

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
          {(validated && (
            <svg
              style={{
                marginLeft: "0.5rem",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              fill="green"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
              onClick={validateHandler}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          )) || (
            <img
              src="data:image/png;base64,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"
              onClick={validateHandler}
              style={{ height: "2rem", width: "2rem", marginLeft: "0.5rem" }}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ArticleCard;
