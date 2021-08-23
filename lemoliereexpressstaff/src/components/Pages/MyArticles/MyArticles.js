import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import ArticleDetail from "./ArticleDetail/ArticleDetail";
import ArticleCard from "./ArticleCard/ArticleCard";

import { useState, useEffect } from "react";
import ArticleFilter from "./ArticleFilter/ArticleFilter";

import classes from "./MyArticles.module.css";

import { useTranslation } from "react-i18next";

import { Route } from "react-router-dom";

import { useMediaPredicate } from "react-media-hook";

const test_list = [
    {
        "id": 2,
        "title": "Another test",
        "date": "2021-07-27",
        "author": "Juan",
        "group": "Collaborations externes",
        "img_url": "https://www.azulschool.net/wp-content/uploads/2021/04/Creacion-y-consumo-de-APIs-con-Django-REST-Framework.png",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "language": "Français",
        "validated": true,
        "creator": 4
    },
    {
        "id": 3,
        "title": "Test 3",
        "date": "2021-07-27",
        "author": "User",
        "group": "Collaborations externes",
        "img_url": "https://www.azulschool.net/wp-content/uploads/2021/04/Creacion-y-consumo-de-APIs-con-Django-REST-Framework.png",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "language": "Français",
        "validated": true,
        "creator": 4
    },
    {
        "id": 4,
        "title": "Test 4",
        "date": "2021-08-22",
        "author": "Sabina",
        "group": "Collaborations externes",
        "img_url": "https://www.azulschool.net/wp-content/uploads/2021/04/Creacion-y-consumo-de-APIs-con-Django-REST-Framework.png",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "language": "Français",
        "validated": true,
        "creator": 1
    }
]

const MyArticles = (props) => {
    const { t } = useTranslation();

  const fetchInitialArticleList = () => {
    setError(null);
    setIsLoading(false);
    fetch(
      "https://moliereexpressapi.pythonanywhere.com/articles/validated-article-list/"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((fetchedList) => {
        // setBaseArticleList(fetchedList.filter(article => article.toString() == "User"));
      })
      .catch((error) => {
        setError(t("lastarticles_error"));
        setBaseArticleList(test_list.filter(article => article.author.toString() == "User")) //added this line as test for filtering functionnality, normal line is in .then
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

export default MyArticles;