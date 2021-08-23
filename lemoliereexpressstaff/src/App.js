import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import { useState } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";

import CustomNavbar from "./components/UI/NavBar/CustomNavbar";
import Footer from "./components/UI/Footer/Footer";

import MyArticles from './components/Pages/MyArticles/MyArticles';

function App() {
  const [footerFixed, setFooterFixed] = useState(false);
  return (
    <div style={{height: 'inherit'}}>
      {ReactDOM.createPortal(
        <CustomNavbar />,
        document.getElementById("navbar")
      )}
      <Route path="/my-articles">
        <MyArticles setFooterFixed={setFooterFixed} />
      </Route>
      {ReactDOM.createPortal(
        <Footer className="footer" fixed={footerFixed} />,
        document.getElementById("footer")
      )}
    </div>
  );
}

export default App;
