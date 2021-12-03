import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  user: {},
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const userIsLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
