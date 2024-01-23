import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAuthToken(storedToken);
      setAuthEmail(localStorage.getItem("userEmail"));
    }
  }, [authToken]);

  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("access_token", token);
  };

  const removeToken = () => {
    setAuthToken(null);
    setAuthEmail(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, authEmail, setToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
