
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role')); // BROKEN PART 3: Storing role in localStorage

  useEffect(() => {
    if(token && role) {
        setUser({ token, role });
    }
  }, [token, role]);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role); // BROKEN PART 3: Storing role in localStorage
    setToken(data.token);
    setRole(data.user.role);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
