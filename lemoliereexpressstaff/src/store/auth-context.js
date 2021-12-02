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
  const [user, setUser] = useState(null)
  const userIsLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = () => setUser({});

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
