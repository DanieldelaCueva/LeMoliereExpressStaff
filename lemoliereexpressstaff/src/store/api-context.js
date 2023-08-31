import React from "react";
import { useState } from "react";

const ApiContext = React.createContext({
  endpoint: "",
});

export const ApiContextProvider = (props) => {
  const [endpoint, setEndpoint] = useState("https://moliereexpressapi.pythonanywhere.com")

  const contextValue = {
    endpoint: endpoint,
  };
  return (
    <ApiContext.Provider value={contextValue}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
