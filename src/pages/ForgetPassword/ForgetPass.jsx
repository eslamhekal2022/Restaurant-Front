import React, { useState } from "react";
import axios from "axios";
import "./forgetPassword.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      toast.error("الرجاء إدخال البريد وكلمة المرور الجديدة");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 حروف أو أكثر");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/forgetPassword`, {
        email,
        newPassword
      });

      if (data.success) {
        toast.success(data.message);
        setEmail("");
        setNewPassword("");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء محاولة تغيير كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-container">
      <form className="forget-form" onSubmit={handleForgetPassword}>
        <h2>🔐 Forget your Password</h2>

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Updating..." : "🔄 Update Password"}
        </button>
      </form>
    </div>
  );
}
