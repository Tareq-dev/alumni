import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("access_token", token);
  };

  const removeToken = () => {
    setAuthToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, removeToken }}>
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
