import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles } from "lucide-react";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("userId", res.data.userId);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="auth-wrapper">
      <motion.div 
        className="auth-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="auth-logo">
          <div className="auth-logo-box">
            <Sparkles size={32} />
          </div>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Enter your credentials to access your journal</p>
        </div>

        <div className="auth-card">
          <div className="auth-form-group">
            <label className="auth-label">Email address</label>
            <div className="auth-input-wrapper">
              <Mail className="auth-icon" />
              <input
                className="auth-input"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-icon" />
              <input
                className="auth-input"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="auth-submit-btn" onClick={login}>
            Sign in
          </button>
        </div>

        <p className="auth-link-text">
          Don't have an account? <span className="auth-link" onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;