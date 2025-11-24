// // src/context/AppContext.jsx
// import React, { createContext, useState, useEffect } from "react";

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // 👇 Load user from localStorage (to persist after refresh)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (username, password) => {
//     // Here you can add real authentication with backend
//     const newUser = { username };
//     setUser(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//   };

//   const signup = (username, password) => {
//     // For now, treat signup the same as login
//     const newUser = { username };
//     setUser(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AppContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser)); // ✅ consistent
      return true;
    }
    return false;
  };

  const signup = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      return false; // already exists
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // ✅ set current
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AppContext.Provider>
  );
};
