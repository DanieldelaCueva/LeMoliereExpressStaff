import React from "react";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (!!storedUser) {
      fetch(`https://moliereexpressapi.pythonanywhere.com/authorization/check-login/${storedUser.username}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Unable to fetch");
          }
        })
        .then((data) => {
          if (data === "false") {
            setUser(null);
            localStorage.removeItem("user");
          } else if (data !== storedUser.token) {
            setUser(null);
            localStorage.removeItem("user");
          }
        });
    }
  }, [storedUser]);

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
