import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './addReview.css';

const AddReview = () => {
  const [form, setForm] = useState({ comment: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ratings = useMemo(() => [1, 2, 3, 4, 5], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!form.comment.trim()) {
      toast.warning('Please enter your comment.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/addReviews`,
        form,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );

      if (data.success) {
        toast.success("Thank you for your review!");
        setTimeout(() => navigate("/"), 1000); // ✅ slight delay for UX
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send review. Try again later.");
    } finally {
      setLoading(false);
    }
  }, [form, navigate]);

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        name="comment"
        placeholder="What's your opinion?"
        value={form.comment}
        onChange={handleChange}
        required
      />
      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
      >
        {ratings.map((num) => (
          <option key={num} value={num}>
            ⭐ {num}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit your feedback'}
      </button>
    </form>
  );
};

export default AddReview;
