import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../Redux/user.js";
import './login.css';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, user);
      if (res.data?.success) {
        const { token, user: userData } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUserRedux(userData));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
      <p className="auth-text">
        Don’t have an account?{" "}
        <Link className="auth-link" to="/register">Register</Link>
      </p>
      <p className="auth-text">
        Forgot your password?{" "}
        <Link className="auth-link" to="/ForgetPassword">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
