import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import classes from "./ArticleDetail.module.css";

import { useTranslation } from "react-i18next";

import { Link, Redirect, useParams } from "react-router-dom";

const ArticleDetail = (props) => {
  const params = useParams();
  const article_id = params.articleId;

  const [detailedArticle, setDetailedArticle] = useState([]);
  const [error404, setError404] = useState(false);

  const [title, setTitle] = useState("Test");
  const [text, setText] = useState("");

  const { t } = useTranslation();

  const fetchDetailedArticle = (id) => {
    setError404(false);
    fetch(
      `http://127.0.0.1:8000/articles/all-article-detail/${id}`
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
  }, [article_id]);

  useEffect(() => {
    setTitle(detailedArticle.title);
    setText(detailedArticle.content);
  }, [detailedArticle])

  const updateHandler = () => {
    let new_article = detailedArticle;
    new_article.title = title;
    new_article.content = text;
    new_article.validated = false;
    console.log(new_article);
    fetch(`http://127.0.0.1:8000/articles/article-update/${article_id}/`, {
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
        throw new Error()
      }
    }).then(data => {
      props.fetch();
    }).catch(e => console.error(e));
  }

  const changeTitleHandler = event => {
    setTitle(event.target.value);
  }

  const changeTextHandler = event => {
    setText(event.target.value);
  }


  return (
    <div>
      {!error404 && <Modal centered show={true} dialogClassName={classes.modal}>
        <Modal.Header>
          <Modal.Title><input type="text" value={title} onChange={changeTitleHandler}/></Modal.Title>
        </Modal.Header>
        <Image src={detailedArticle.img_url} alt="Article image" />
        <Modal.Body>
          <h6 className={classes.attribs}>
            {t("lastarticles_author")}: {detailedArticle.author}
          </h6>
          <h6 className={classes.attribs}>
            {t("lastarticles_date")}: {detailedArticle.date}
          </h6>
          <h6 className={classes.attribs}>
            {t("lastarticles_group")}: {detailedArticle.group}
          </h6>{" "}
          <br />
          <p><textarea rows="10" cols="63" style={{resize: "none"}} value={text} onChange={changeTextHandler}/></p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-secondary">
            <Link className={classes.link_nodec} to="/my-articles">
              {t("articledetail_cancel")}
            </Link>
          </Button>
          <Button variant="secondary" onClick={updateHandler}>
            <Link className={classes.link_nodec} to="/my-articles">
              {t("articledetail_update")}
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>}

      {error404 && <Redirect to="/404"></Redirect>}
    </div>
  );
};

export default ArticleDetail;
