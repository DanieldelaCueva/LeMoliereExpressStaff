import React from "react";
import { useState } from "react";

const ApiContext = React.createContext({
  endpoint: "",
});

export const ApiContextProvider = (props) => {
  const [endpoint, setEndpoint] = useState("http://127.0.0.1:8000")

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
