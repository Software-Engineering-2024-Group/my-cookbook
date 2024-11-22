import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// Define the type for the props
interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Type for the setIsLoggedIn function
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/recipe/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setIsLoggedIn(true);
      localStorage.setItem("token", data.access_token);
      navigate("/home");
    } else {
      alert(data.detail);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          don't have an account <a href="/signup">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
