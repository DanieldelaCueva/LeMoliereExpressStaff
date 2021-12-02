import "./App.css";

import ReactDOM from "react-dom";
import { useState, useContext } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import CustomNavbar from "./components/UI/NavBar/CustomNavbar";
import Footer from "./components/UI/Footer/Footer";

import MyArticles from "./components/Pages/MyArticles/MyArticles";
import GroupArticles from "./components/Pages/GroupArticles/GroupArticles";
import Login from "./components/Pages/Login/Login";
import NotFound404 from "./components/Pages/NotFound404/NotFound404";
import AllArticles from "./components/Pages/AllArticles/AllArticles";
import CreateArticle from "./components/Pages/CreateArticle/CreateArticle";
import ChangePassword from "./components/Pages/ChangePassword/ChangePassword";

import { Helmet } from "react-helmet";
import AuthContext from "./store/auth-context";

const App = () => {
  const [footerFixed, setFooterFixed] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const authCtx = useContext(AuthContext);

  const checkPermissions = () => {
    const stored_user = localStorage.getItem("user");
    if (stored_user) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  };

  return (
    <div style={{ height: "inherit" }}>
      {ReactDOM.createPortal(
        <CustomNavbar userLoggedIn={userLoggedIn} />,
        document.getElementById("navbar")
      )}
      <Helmet>
        <title>Le Molière Express App</title>
        <meta name="description" content="Le Molière Express's app" />
      </Helmet>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path="/login">
            <Login setFooterFixed={setFooterFixed} />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <>
            <Route path="/my-articles">
              <MyArticles
                setFooterFixed={setFooterFixed}
                checkPermissions={checkPermissions}
                userLoggedIn={userLoggedIn}
              />
            </Route>
            <Route path="/group-articles">
              <GroupArticles
                setFooterFixed={setFooterFixed}
                checkPermissions={checkPermissions}
                userLoggedIn={userLoggedIn}
              />
            </Route>
            <Route path="/all-articles">
              <AllArticles
                setFooterFixed={setFooterFixed}
                footerFixed={footerFixed}
                checkPermissions={checkPermissions}
                userLoggedIn={userLoggedIn}
              />
            </Route>
            <Route path="/create-article">
              <CreateArticle
                checkPermissions={checkPermissions}
                userLoggedIn={userLoggedIn}
                setFooterFixed={setFooterFixed}
              />
            </Route>
            <Route path="/change-password">
              <ChangePassword
                checkPermissions={checkPermissions}
                userLoggedIn={userLoggedIn}
                setFooterFixed={setFooterFixed}
              />
            </Route>
          </>
        )}
        <Route path="/404">
          <NotFound404 setFooterFixed={setFooterFixed} />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
      {ReactDOM.createPortal(
        <Footer className="footer" fixed={footerFixed} />,
        document.getElementById("footer")
      )}
    </div>
  );
};

export default App;
