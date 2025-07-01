// pages/AllUsers/AllUser.jsx
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../../context/userContext.js';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './allusers.css';
import loading from "../Loading/482219503_122111766968774860_1765049624887787653_n.jpg"
export default function AllUser() {
  const { users, loading, getAllUser, setRefresh } = useUser();

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/deleteUser/${id}`);
        if (response.data.success) {
          toast.success("تم حذف المستخدم بنجاح");
          getAllUser();
          setRefresh(prev => !prev);
          Swal.fire('تم!', 'تم حذف المستخدم.', 'success');
        } else {
          toast.error(response.data.message || "حدث خطأ أثناء الحذف");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "حدث خطأ");
      }
    }
  };

if (loading) {
  return (
    <div className="custom-loader-container">
      <img src={loading} alt="Loading" className="custom-loader-image" />
      <p className="custom-loader-text">جارٍ تحميل المستخدمين...</p>
    </div>
  );
}
  return (
    <div className="all-users">
      <h2>جميع المستخدمين</h2>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
                title="حذف المستخدم"
              >
                <FaTrashAlt />
              </button>

              <div className="card-header">
                <p><strong>الاسم:</strong> {user.name}</p>
              </div>
              <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
              <p><strong>الدور:</strong> {user.role}</p>

              <Link className="edit-btn" to={`/UpdateRole/${user._id}`}>
                <FaEdit /> تعديل الدور
              </Link>
            </div>
          ))
        ) : (
          <p className="no-users">لا يوجد مستخدمين.</p>
        )}
      </div>
    </div>
  );
}
