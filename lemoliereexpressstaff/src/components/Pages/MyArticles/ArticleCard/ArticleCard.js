import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import classes from "./ArticleCard.module.css";

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
const ArticleCard = (props) => {
  const { t } = useTranslation();

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

  return (
    <Col lg={4} md={6} sm={12}>
      <Card style={{ width: "auto", margin: "2rem 2rem" }}>
        <Card.Img variant="top" src={props.article.img_url} alt="Article image" />
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
              to={`/read-last-articles/${props.article.id}`}
            >
              {t("articlecard_open")}
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
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ArticleCard;
