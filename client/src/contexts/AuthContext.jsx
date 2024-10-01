import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user name from local storage, if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true); // For loading state

  // Effect to set loading to false after initial load
  useEffect(() => {
    setLoading(false); // Set loading to false after initial check
  }, []);

  const login = ({ name, token }) => {
    // Store user name and token in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ name }));
    setUser({ name });
  };

  const logout = () => {
    // Clear local storage and set user to null
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("answers");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
