import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  user: {},
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;

  const history = useHistory();

  const loginHandler = (username, password) => {
    fetch("http://127.0.0.1:8000/authorization/login/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Username or password are incorrect");
        }
      })
      .then((data) => {
        setToken(data.token);
        fetch(
          `http://127.0.0.1:8000/authorization/user-detail/${username}`
        )
          .then((response) => {
            if (response.ok) {
              if (response !== {}) {
                return response.json();
              } else {
                throw new Error("Could not retrieve user info");
              }
            } else {
              throw new Error("Could not retrieve user info");
            }
          })
          .then((data) => {
            contextValue.user.id = data.id;
            contextValue.user.username = username;
            contextValue.user.name = `${data.first_name} ${data.last_name}`;
            contextValue.user.group = data.group;
            contextValue.user.is_coordinator = data.is_coordinator;
            history.replace('/my-articles');
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  const logoutHandler = () => setToken(null);

  const contextValue = {
    token: token,
    user: {},
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
