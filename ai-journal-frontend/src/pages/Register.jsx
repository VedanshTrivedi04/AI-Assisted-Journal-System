import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Sparkles } from "lucide-react";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", { email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
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
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Start journaling with AI insights</p>
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
                placeholder="Create a strong password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="auth-submit-btn" onClick={register}>
            Sign up
          </button>
        </div>

        <p className="auth-link-text">
          Already have an account? <span className="auth-link" onClick={() => navigate("/")}>Sign in</span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;