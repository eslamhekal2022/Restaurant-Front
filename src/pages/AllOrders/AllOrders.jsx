import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './allOrders.css';

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getAllOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getOrders`, {
        headers: { token }
      });

      if (data.success) {
        const filtered = data.data.filter(order => order.userId);
        setAllOrders(filtered);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/updateOrderStatus/${orderId}`,
        { status: newStatus },
        {
          headers: { token }
        }
      );

      if (data.success) {
        toast.success("Status updated");
        setAllOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteorder/${id}`, {
          headers: { token }
        });

        if (response.data.success) {
          toast.success("Order deleted successfully");
          getAllOrders();
        } else {
          toast.error(response.data.message || "Error deleting order");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (loading) return <div className="loading-orders">جاري تحميل الطلبات...</div>;

  if (allOrders.length === 0) {
    return <div className="no-orders">🚫 لا يوجد طلبات حاليًا.</div>;
  }

  return (
    <div className="AllOrders">
      {allOrders.map((order, i) => (
        <div className="order" key={order._id}>
          <button className="DeleteOrder" onClick={() => deleteOrder(order._id)}>×</button>

          <h2>Order #{i + 1}</h2>
          <p><strong>Name:</strong> {order.userId.name}</p>
          <p><strong>Email:</strong> {order.userId.email}</p>
          <p><strong>Phone:</strong> 0{order.userId.phone}</p>
          <p><strong>Total Price:</strong> {order.totalPrice} EGP</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <div>
            <strong>Status:</strong>{" "}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="product-list">
            <h4>Products:</h4>
            {order.products.map((prod, index) => (
              <div className="product" key={index}>
                <p>🍕 <strong>{prod.productId?.name || 'Unknown'}</strong></p>
                <p>Quantity: {prod.quantity}</p>
              </div>
            ))}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}
