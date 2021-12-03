import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import ArticleDetail from "../../Articles/ArticleDetail/ArticleDetail";
import ArticleCard from "../../Articles/ArticleCard/ArticleCard";

import { useState, useEffect } from "react";
import ArticleFilter from "../../Articles/ArticleFilter/ArticleFilter";

import classes from "./AllArticles.module.css";

import { useTranslation } from "react-i18next";

import { Route, Redirect } from "react-router-dom";

import { useMediaPredicate } from "react-media-hook";

import { Helmet } from "react-helmet";

const AllArticles = (props) => {
  const { t } = useTranslation();

  const fetchInitialArticleList = () => {
    setError(null);
    setIsLoading(false);
    fetch(
      "https://moliereexpressapi.pythonanywhere.com/articles/all-article-list/"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((fetchedList) => {
        setBaseArticleList(fetchedList.reverse());
      })
      .catch((error) => {
        setError(t("lastarticles_error"));
      });
  };

  const [baseArticleList, setBaseArticleList] = useState([]);
  const [articleList, setArticleList] = useState(baseArticleList);

  const [actualFilter, setActualFilter] = useState(t("lastarticles_title"));

  const [typedSearch, setTypedSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialArticleList();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setArticleList(baseArticleList);
    }, 500);
    setIsLoading(false);
  }, [baseArticleList]);

  const not_mobile_screen = useMediaPredicate("(min-width: 992px)");

  useEffect(() => {
    if (articleList.length < 4) {
      props.setFooterFixed(not_mobile_screen);
    }
  }, [not_mobile_screen, articleList]);

  useEffect(() => {
    if (articleList.length < 4) {
      props.setFooterFixed(not_mobile_screen);
    }
  });

  const filterArticles = () => {
    if (
      actualFilter === "Titre" ||
      actualFilter === "Title" ||
      actualFilter === "Título"
    ) {
      setArticleList(
        baseArticleList.filter((article) =>
          article.title.toString().includes(typedSearch)
        )
      );
    }
    if (
      actualFilter === "Auteur" ||
      actualFilter === "Author" ||
      actualFilter === "Autor"
    ) {
      setArticleList(
        baseArticleList.filter((article) =>
          article.author.toString().includes(typedSearch)
        )
      );
    }
    if (actualFilter === "Date" || actualFilter === "Fecha") {
      setArticleList(
        baseArticleList.filter((article) =>
          article.date.toString().includes(typedSearch)
        )
      );
    }
    if (
      actualFilter === "Group" ||
      actualFilter === "Rubrique" ||
      actualFilter === "Sección"
    ) {
      setArticleList(
        baseArticleList.filter((article) =>
          article.group.toString().includes(typedSearch)
        )
      );
    }
    if (
      actualFilter === "Language" ||
      actualFilter === "Langue" ||
      actualFilter === "Idioma"
    ) {
      setArticleList(
        baseArticleList.filter((article) =>
          article.language.toString().includes(typedSearch)
        )
      );
    }
  };

  useEffect(() => {
    if (articleList.length === 0) {
      props.setFooterFixed(true);
    } else {
      props.setFooterFixed(false);
    }
  }, [articleList]);

  return (
    <div>
      <Container className={classes.container}>
      <Helmet>
        <title>LME App | All articles</title>
        <meta
          name="description"
          content="Le Molière Express's app. Page where staff can see everybody's articles."
        />
      </Helmet>
        <ArticleFilter
          typedSearch={typedSearch}
          onChangeTyped={setTypedSearch}
          filterArticles={filterArticles}
          actualFilter={actualFilter}
          setActualFilter={setActualFilter}
        />
        <Row>
          {!isLoading &&
            articleList.lenght !== 0 &&
            articleList.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                setTypedSearch={setTypedSearch}
                setActualFilter={setActualFilter}
              />
            ))}
          {!isLoading && articleList.length === 0 && (
            <Container className={classes.not_found__container}>
              <h2 className={classes.not_found__h2}>
                {t("lastarticle_notfound")}
              </h2>
            </Container>
          )}
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>

      <Route path="/read-last-articles/:articleId">
        <ArticleDetail
          setTypedSearch={setTypedSearch}
          setActualFilter={setActualFilter}
        />
      </Route>
    </div>
  );
};

export default AllArticles;