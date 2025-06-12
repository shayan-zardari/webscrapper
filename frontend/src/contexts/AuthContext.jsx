import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromLocalStorage = JSON.parse(localStorage.getItem("token"));

    if (userFromLocalStorage) setUser(userFromLocalStorage);
    if (tokenFromLocalStorage) setToken(tokenFromLocalStorage);

    console.log(user, token);

    setLoading(false);
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, loading, setLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
