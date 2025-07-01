import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AdminRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!user) {
      // ممكن تعمل fetch user هنا لو حبيت
      setChecking(false);
      return;
    }

    if (user.role !== "admin" && user.role !== "moderator") {
      navigate("/");
      return;
    }

    setChecking(false);
  }, [navigate, user]);

  if (checking) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>جاري التحقق من الصلاحية...</div>;
  }

  return children;
}
