import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [expiryTime, setExpiryTime] = useState(null);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    if (token && expiryTime) {
      const remainingTime = expiryTime - Date.now();
      if (remainingTime <= 0) {
        logoutHandler();
      } else {
        const logoutTimer = setTimeout(logoutHandler, remainingTime);
        return () => {
          clearTimeout(logoutTimer);
        };
      }
    }
  }, [token, expiryTime]);

  const logoutHandler = () => {
    setToken(null);
    setExpiryTime(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    setToken(token);
    const expiresIn = 300000;
    const expiryTime = Date.now() + expiresIn;
    setExpiryTime(expiryTime);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token: token,
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
