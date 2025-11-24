// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (user) {
//       // ✅ save as "user" for consistency
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/dashboard");
//     } else {
//       alert("Invalid credentials. Please signup first.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Login</h3>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="form-control mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="form-control mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn btn-success">
//           Login
//         </button>
//       </form>
//       <p className="mt-3">
//         Don’t have an account? <a href="/signup">Signup</a>
//       </p>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.jsx
// import React, { useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const Login = () => {
//   const { login, signup } = useContext(AppContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignup, setIsSignup] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup) {
//       signup(username, password);
//     } else {
//       login(username, password);
//     }
//     setUsername("");
//     setPassword("");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>{isSignup ? "Sign Up" : "Login"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//       </form>
//       <p>
//         {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//         <button onClick={() => setIsSignup(!isSignup)}>
//           {isSignup ? "Login" : "Sign Up"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or user not found. Please signup first.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don’t have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default Login;
