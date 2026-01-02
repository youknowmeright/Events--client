
// import React, { useState } from "react";
// import Swal from "sweetalert2";

// const ADMIN_EMAIL = "admin@event.com";
// const ADMIN_PASSWORD = "Admin12333";

// const AddEvent = () => {
//   const [disabled, setDisabled] = useState(false);

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);
//     const newEvent = Object.fromEntries(formData.entries());

//     const confirm = await Swal.fire({
//       title: "Add New Event?",
//       text: `Are you sure you want to add "${newEvent.eventName}"?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Add",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await fetch("https://noooo-five.vercel.app/events", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eventName: newEvent.eventName,
//           date: newEvent.date,
//           location: newEvent.location,
//           category: newEvent.category,
//           description: newEvent.description,
//           availableSeats: Number(newEvent.availableSeats),
//           registrationFee: Number(newEvent.registrationFee),
//           imageUrl: newEvent.imageUrl || "",
//           email: ADMIN_EMAIL,
//           password: ADMIN_PASSWORD,
//         }),
//       });

//       const text = await res.text();
//       if (!res.ok) throw new Error(text || "Failed to add event");

//       setDisabled(true);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Event Added Successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       form.reset();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Add Event",
//         text: err.message,
//       });
//     }
//   };

//   return (
//     <div className="bg-blue-950 min-h-screen">
//       <div className="p-24">
//         <div className="text-center p-12 space-y-3.5">
//           <h1 className="text-6xl text-white font-bold">ADD NEW EVENT</h1>
//         </div>

//         <form onSubmit={handleAddEvent}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Event Name</legend>
//               <input name="eventName" className="input w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Date</legend>
//               <input type="datetime-local" name="date" className="input w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Location</legend>
//               <input name="location" className="input w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Category</legend>
//               <input name="category" className="input w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4 col-span-2">
//               <legend>Description</legend>
//               <textarea name="description" className="textarea w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Seats</legend>
//               <input type="number" name="availableSeats" className="input w-full" required />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Image URL</legend>
//               <input name="imageUrl" className="input w-full" />
//             </fieldset>

//             <fieldset className="fieldset bg-base-200 border p-4">
//               <legend>Registration Fee</legend>
//               <input type="number" name="registrationFee" className="input w-full" required />
//             </fieldset>

//           </div>

//           <button
//             type="submit"
//             disabled={disabled}
//             className="btn w-full my-4"
//           >
//             {disabled ? "Added" : "Add Event"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ADMIN_EMAIL = "admin@event.com";
const ADMIN_PASSWORD = "Admin12333";

const AddEvent = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  // ✅ ADMIN CHECK — NO LOGIN AGAIN
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Admin login required",
      }).then(() => {
        navigate("/admin-login");
      });
    }
  }, [navigate]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newEvent = Object.fromEntries(formData.entries());

    const confirm = await Swal.fire({
      title: "Add New Event?",
      text: `Are you sure you want to add "${newEvent.eventName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch("https://noooo-five.vercel.app/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: newEvent.eventName,
          date: newEvent.date,
          location: newEvent.location,
          category: newEvent.category,
          description: newEvent.description,
          availableSeats: Number(newEvent.availableSeats),
          registrationFee: Number(newEvent.registrationFee),
          imageUrl: newEvent.imageUrl || "",
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || "Failed to add event");

      setDisabled(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Event Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Event",
        text: err.message,
      });
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen">
      <div className="p-24">
        <div className="text-center p-12">
          <h1 className="text-6xl text-white font-bold">ADD NEW EVENT</h1>
        </div>

        <form onSubmit={handleAddEvent}>



          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Event Name</legend>
              <input name="eventName" className="input w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Date</legend>
              <input type="datetime-local" name="date" className="input w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Location</legend>
              <input name="location" className="input w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Category</legend>
              <input name="category" className="input w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4 col-span-2">
              <legend>Description</legend>
              <textarea name="description" className="textarea w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Seats</legend>
              <input type="number" name="availableSeats" className="input w-full" required />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Image URL</legend>
              <input name="imageUrl" className="input w-full" />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border p-4">
              <legend>Registration Fee</legend>
              <input type="number" name="registrationFee" className="input w-full" required />
            </fieldset>

          </div>

          <button
            type="submit"
            disabled={disabled}
            className="btn w-full my-4"
          >
            {disabled ? "Added" : "Add Event"}
          </button>
        
          {/* 🔽 YOUR FORM — UNCHANGED 🔽 */}
          {/* (exact same as you sent) */}
        </form>
      </div>
    </div>
  );
};

export default AddEvent;

