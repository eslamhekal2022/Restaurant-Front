import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import './getContact.css';

export default function GetContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getContacts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getContacts`);
      if (data.success && Array.isArray(data.data)) {
        setContacts(data.data);
      } else {
        toast.error('❌ Failed to load contacts');
      }
    } catch (error) {
      console.error(error);
      toast.error('⚠️ Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/deleteContact/${id}`);
      if (data.success) {
        toast.success('🗑️ Contact deleted');
        setContacts(prev => prev.filter(c => c._id !== id));
      } else {
        toast.error('❌ Failed to delete');
      }
    } catch (error) {
      console.error(error);
      toast.error('⚠️ Error deleting contact');
    }
  };

  useEffect(() => {
    getContacts();
    const socket = io(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
    });

    socket.on('new-contact', (data) => {
      toast.info(data.message || '📨 New contact message received');
      setContacts(prev => [data.contact, ...prev]); // أفضل من إعادة التحميل كله
      try {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(() => {}); // لو مفيش صوت مش يعمل crash
      } catch {}
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="contacts-page">
      <h2>All Contacts</h2>

      {loading ? (
        <p className="loader">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="empty-message">No contacts found.</p>
      ) : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter(contact => contact.userId)
              .map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.userId.name}</td>
                  <td>{contact.userId.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteContact(contact._id)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
