// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     if (users.find((u) => u.email === email)) {
//       alert("User already exists! Please login.");
//       navigate("/login");
//       return;
//     }

//     users.push({ username, email, password });
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Signup successful! Please login.");
//     navigate("/login");
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Signup</h3>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="Username"
//           className="form-control mb-3"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
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
//         <button type="submit" className="btn btn-primary">
//           Signup
//         </button>
//       </form>
//       <p className="mt-3">
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { signup } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(username, email, password);
    if (success) {
      alert("Signup successful!");
      navigate("/dashboard");
    } else {
      alert("User already exists. Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Signup</h3>
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
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
