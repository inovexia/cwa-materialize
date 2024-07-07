import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [count, setCount] = useState(5);
  const [accessToken, setAccessToken] = useState("");
  const [appSession, setAppSession] = useState("");

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, appSession, setAppSession }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalContextProvider;
