import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  
  // Check local storage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Function to set the token and update local storage
  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("access_token", token);
  };

  // Function to remove the token and clear local storage
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
