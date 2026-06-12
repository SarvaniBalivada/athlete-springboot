import { useState } from "react";
import { AuthContext } from "./AuthContextProvider";

const getStoredToken = () => localStorage.getItem("token");
const getStoredRole = () => localStorage.getItem("role");
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredToken());
  const [role, setRole] = useState(getStoredRole);
  const [user, setUser] = useState(getStoredUser);

  const login = (token, userRole, userInfo) => {
    localStorage.setItem("token", token);
    if (userRole) {
      localStorage.setItem("role", userRole);
      setRole(userRole);
    } else {
      localStorage.removeItem("role");
      setRole(null);
    }
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
