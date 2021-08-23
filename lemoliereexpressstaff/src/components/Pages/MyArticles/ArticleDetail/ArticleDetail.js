import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import classes from "./ArticleDetail.module.css";

import { useTranslation } from "react-i18next";

import { Link, Redirect, useParams } from "react-router-dom";

const initial_article = {
  id: 1,
  title: "Test",
  date: "2021-07-27",
  img_url:
    "https://www.azulschool.net/wp-content/uploads/2021/04/Creacion-y-consumo-de-APIs-con-Django-REST-Framework.png",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  validated: false,
  group: "Science et technologie",
  language: "English",
  author: 4,
};

const ArticleDetail = (props) => {
  const params = useParams();
  const article_id = params.articleId;

  const [detailedArticle, setDetailedArticle] = useState(initial_article);
  const [error404, setError404] = useState(false);

  const { t } = useTranslation();

  const fetchDetailedArticle = (id) => {
    setError404(false);
    fetch(
      `https://moliereexpressapi.pythonanywhere.com/articles/validated-article-detail/${id}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 500) {
          throw new Error("500");
        }
      })
      .then((fetchedArticle) => setDetailedArticle(fetchedArticle))
      .catch((error) => {
        setError404(true);
      });
  };

  useEffect(() => {
    fetchDetailedArticle(article_id);
  }, []);

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
    <div>
      {!error404 && <Modal centered show={true} dialogClassName={classes.modal}>
        <Modal.Header>
          <Modal.Title>{detailedArticle.title}</Modal.Title>
        </Modal.Header>
        <Image src={detailedArticle.img_url} alt="Article image" />
        <Modal.Body>
          <h6 className={classes.attribs}>
            {t("lastarticles_author")}:{" "}
            <Link
              className={classes.link}
              onClick={() => onClickAuthor(detailedArticle.author)}
              to="/read-last-articles"
            >
              {detailedArticle.author}
            </Link>
          </h6>
          <h6 className={classes.attribs}>
            {t("lastarticles_date")}:{" "}
            <Link
              className={classes.link}
              onClick={() => onClickDate(detailedArticle.date)}
              to="/read-last-articles"
            >
              {detailedArticle.date}
            </Link>
          </h6>
          <h6 className={classes.attribs}>
            {t("lastarticles_group")}:{" "}
            <Link
              className={classes.link}
              onClick={() => onClickGroup(detailedArticle.group)}
              to="/read-last-articles"
            >
              {detailedArticle.group}
            </Link>
          </h6>{" "}
          <br />
          <p>{detailedArticle.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            <Link className={classes.link_nodec} to="/read-last-articles">
              {t("articledetail_close")}
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>}

      {error404 && <Redirect to="/404"></Redirect>}
    </div>
  );
};

export default ArticleDetail;
