import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import classes from "./ArticleFilter.module.css";

import { useEffect } from "react";

import { useTranslation } from "react-i18next";

const ArticleFilter = (props) => {
  const { t } = useTranslation();

  const onSelectFilterHandler = (selectedFilter) => {
    props.setActualFilter(selectedFilter);
  };

  const onTypeHandler = (event) => {
    props.onChangeTyped(event.target.value.toString());
  };

  useEffect(() => {
    setTimeout(() => {
      props.filterArticles();
    }, 500);
  }, [props.typedSearch]);

  return (
    <Container className={classes.container} id="filter">
      <label htmlFor="dropdown-basic-button" className={classes.label}>
        {t("articlefilter_filterby")}
      </label>

      <DropdownButton
        id="dropdown-basic-button"
        title={props.actualFilter}
        className={classes.dropdown}
      >
        <Dropdown.Item
          onClick={() => onSelectFilterHandler(t("lastarticles_title"))}
        >
          {t("lastarticles_title")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onSelectFilterHandler(t("lastarticles_author"))}
        >
          {t("lastarticles_author")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onSelectFilterHandler(t("lastarticles_date"))}
        >
          {t("lastarticles_date")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onSelectFilterHandler(t("lastarticles_group"))}
        >
          {t("lastarticles_group")}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => onSelectFilterHandler(t("lastarticles_language"))}
        >
          {t("lastarticles_language")}
        </Dropdown.Item>
      </DropdownButton>

      <Container className={classes.searchBar_container}>
        <input
          className={classes.searchBar}
          type="text"
          placeholder={t("lastarticles_search")}
          onChange={onTypeHandler}
          value={props.typedSearch}
        />
      </Container>
    </Container>
  );
};

export default ArticleFilter;
