import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://noooo-five.vercel.app/bookings/user/${user.email}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
        setBookings(data.bookings || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Error", text: err.message });
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`https://noooo-five.vercel.app/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

      setBookings((prev) => prev.filter((b) => b._id !== id));
      Swal.fire({ icon: "success", title: "Booking cancelled", timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  // const handleReview = async (id) => {
  //   const { value: formValues } = await Swal.fire({
  //     title: "Add Review",
  //     html: `
  //       <input type="number" id="swal-rating" class="swal2-input" placeholder="Rating 1-5" min="1" max="5">
  //       <textarea id="swal-comment" class="swal2-textarea" placeholder="Comment"></textarea>
  //     `,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       const rating = document.getElementById("swal-rating").value;
  //       const comment = document.getElementById("swal-comment").value;
  //       if (!rating || !comment) Swal.showValidationMessage("Please fill in all fields");
  //       return { rating, comment };
  //     },
  //   });

  //   if (!formValues) return;

  //   try {
  //     const res = await fetch(`https://noooo-five.vercel.app/bookings/review/${id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ rating: formValues.rating, comment: formValues.comment }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Failed to add review");

  //     Swal.fire({ icon: "success", title: "Review added", timer: 1500, showConfirmButton: false });
  //   } catch (err) {
  //     Swal.fire({ icon: "error", title: "Error", text: err.message });
  //   }
  // };

  const handleReview = async (id, userName) => {
  const { value: formValues } = await Swal.fire({
    title: "Add Review",
    html: `
      <input 
        type="number" 
        id="swal-rating" 
        class="swal2-input" 
        placeholder="Rating 1-5" 
        min="1" 
        max="5"
      >
      <textarea 
        id="swal-comment" 
        class="swal2-textarea" 
        placeholder="Comment"
      ></textarea>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const rating = document.getElementById("swal-rating").value;
      const comment = document.getElementById("swal-comment").value;

      if (!rating || !comment) {
        Swal.showValidationMessage("Please fill in all fields");
        return;
      }

      return { rating, comment };
    },
  });

  if (!formValues) return;

  try {
    // ✅ 1. Save review inside booking (previous functionality)
    const bookingRes = await fetch(
      `https://noooo-five.vercel.app/bookings/review/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: formValues.rating,
          comment: formValues.comment,
        }),
      }
    );

    const bookingData = await bookingRes.json();
    if (!bookingRes.ok) {
      throw new Error(bookingData.message || "Failed to add booking review");
    }

    // ✅ 2. Save public review for Home page
    const reviewRes = await fetch(
      "https://noooo-five.vercel.app/reviews",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName || "Anonymous",
          comment: formValues.comment,
        }),
      }
    );

    const reviewData = await reviewRes.json();
    if (!reviewRes.ok) {
      throw new Error(reviewData.message || "Failed to save public review");
    }

    Swal.fire({
      icon: "success",
      title: "Review added successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
};


  if (!user) return <p className="text-center mt-10">Please login to view your bookings.</p>;
  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold text-white">My Bookings</h1>
      {bookings.length === 0 && <p className="text-white">You have no bookings yet.</p>}
      {bookings.map((b) => (
        <div key={b._id} className="bg-blue-800 text-white rounded-xl p-6 w-full max-w-4xl shadow-lg">
          <p><b>Event:</b> {b.eventName}</p>
          <p><b>Date:</b> {new Date(b.date).toLocaleString()}</p>
          <p><b>Tickets:</b> {b.numberOfTickets}</p>
          <p><b>Phone:</b> {b.phone}</p>
          <p><b>Status:</b> {b.status}</p>
          {b.review && (
            <p><b>Review:</b> {b.review.rating}/5 - {b.review.comment}</p>
          )}
          <div className="flex space-x-3 mt-3">
            <button onClick={() => handleCancel(b._id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">Cancel</button>
            <button onClick={() => handleReview(b._id)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">Add Review</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
