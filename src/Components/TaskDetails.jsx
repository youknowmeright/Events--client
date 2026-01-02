// import React, { useContext, useState } from "react";
// import { useLoaderData, useNavigate, useLocation } from "react-router";
// import Swal from "sweetalert2";
// import { AuthContext } from "../Firebase/AuthContext";

// const TaskDetails = () => {
//   const job = useLoaderData();
//   const { user,profile} = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [disabled, setDisabled] = useState(false);

//   const handleRegister = async () => {
//     if (!user) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Please login to register for this event",
//       });
//       navigate("/login", { state: { from: location }, replace: true });
//       return;
//     }

//     // Step 1: Show registration form
//     const { value: formValues } = await Swal.fire({
//       title: "Registration Form",
//       html: `
//         <input id="swal-name" class="swal2-input" placeholder="Name" value="${profile.name || ''}">
//         <input id="swal-email" class="swal2-input" placeholder="Email" value="${profile.email}" readonly>
//         <input id="swal-phone" class="swal2-input" placeholder="Phone number">
//         <input id="swal-tickets" type="number" class="swal2-input" placeholder="Number of tickets" min="1" max="${job.availableSeats}">
//         <input id="swal-payment" class="swal2-input" placeholder="Payment method (optional)">
//       `,
//       focusConfirm: false,
//       preConfirm: () => {
//         const name = document.getElementById('swal-name').value;
//         const email = document.getElementById('swal-email').value;
//         const phone = document.getElementById('swal-phone').value;
//         const tickets = document.getElementById('swal-tickets').value;
//         const payment = document.getElementById('swal-payment').value;

//         if (!name || !email || !phone || !tickets) {
//           Swal.showValidationMessage("Please fill in all required fields");
//           return;
//         }
//         if (parseInt(tickets) > job.availableSeats) {
//           Swal.showValidationMessage(`Only ${job.availableSeats} tickets available`);
//           return;
//         }

//         return { name, email, phone, tickets, payment };
//       }
//     });

//     if (!formValues) return; // User cancelled

//     // Step 2: Confirm registration fee
//     const confirm = await Swal.fire({
//       title: "Confirm Registration",
//       text:
//         job.registrationFee === 0
//           ? "This event is free. Do you want to continue?"
//           : `Registration fee: $${job.registrationFee * parseInt(formValues.tickets)}. Do you want to continue?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Confirm",
//     });

//     if (!confirm.isConfirmed) return;

//     // Step 3: Submit data to backend
//     try {
//       const res = await fetch("https://noooo-five.vercel.app/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eventId: job._id,
//           eventName: job.eventName,
//           date: job.date,
//           location: job.location,
//           category: job.category || "General",
//           userEmail: formValues.email,
//           userName: formValues.name,
//           phone: formValues.phone,
//           numberOfTickets: parseInt(formValues.tickets),
//           paymentMethod: formValues.payment || "",
//           registrationFee: job.registrationFee * parseInt(formValues.tickets),
//           bookedAt: new Date().toISOString(),
//         }),
//       });

//       if (res.status === 409) {
//         setDisabled(true);
//         Swal.fire({ icon: "info", title: "Already Registered", timer: 1500, showConfirmButton: false });
//         return;
//       }

//       if (!res.ok) throw new Error("Failed to register");

//       setDisabled(true);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Registration Confirmed",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({ icon: "error", title: "Registration Failed", text: err.message });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-900 flex justify-center py-12 px-4">
//       <div className="bg-blue-800 text-white rounded-2xl shadow-xl w-full max-w-4xl p-8 space-y-6">
//         <h1 className="text-4xl font-bold border-b border-blue-600 pb-2">{job.eventName}</h1>

//         <div className="space-y-3">
//           <p><b>Description:</b> {job.description}</p>
//           <p><b>Organizer:</b> {job.organizer}</p>
//           <p><b>Date:</b> {new Date(job.date).toLocaleString()}</p>
//           <p><b>Location:</b> {job.location}</p>
//           <p><b>Category:</b> {job.category || "General"}</p>
//           <p><b>Deadline:</b> {new Date(job.registrationDeadline).toLocaleDateString()}</p>
//           <p><b>Available Seats:</b> {job.availableSeats}</p>
//           <p><b>Fee:</b> {job.registrationFee === 0 ? "Free" : `$${job.registrationFee}`}</p>

//           <button
//             onClick={handleRegister}
//             disabled={disabled}
//             className={`btn btn-primary w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {disabled ? "Already Registered" : "Register Now"}
//           </button>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button
//             onClick={() => navigate("/BrowseTask")}
//             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold"
//           >
//             Back to BrowseTask
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskDetails;


import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthContext";

const TaskDetails = () => {
  const data = useLoaderData();
const job = data.event; // <-- extract the event from backend response
 // Loader data is already parsed JSON
  const { user, profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [disabled, setDisabled] = useState(false);

  const handleRegister = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to register for this event",
      });
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    // Step 1: Show registration form
    const { value: formValues } = await Swal.fire({
      title: "Registration Form",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${profile?.name || ''}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${profile?.email || ''}" readonly>
        <input id="swal-phone" class="swal2-input" placeholder="Phone number">
        <input id="swal-tickets" type="number" class="swal2-input" placeholder="Number of tickets" min="1" max="${job.availableSeats}">
        <input id="swal-payment" class="swal2-input" placeholder="Payment method (optional)">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const email = document.getElementById("swal-email").value;
        const phone = document.getElementById("swal-phone").value;
        const tickets = document.getElementById("swal-tickets").value;
        const payment = document.getElementById("swal-payment").value;

        if (!name || !email || !phone || !tickets) {
          Swal.showValidationMessage("Please fill in all required fields");
          return;
        }

        if (parseInt(tickets) > job.availableSeats) {
          Swal.showValidationMessage(`Only ${job.availableSeats} tickets available`);
          return;
        }

        return { name, email, phone, tickets, payment };
      },
    });

    if (!formValues) return; // User cancelled

    // Step 2: Confirm registration fee
    const confirm = await Swal.fire({
      title: "Confirm Registration",
      text:
        job.registrationFee === 0
          ? "This event is free. Do you want to continue?"
          : `Registration fee: $${job.registrationFee * parseInt(formValues.tickets)}. Do you want to continue?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    // Step 3: Submit data to backend
    try {
      // const res = await fetch("https://noooo-five.vercel.app/bookings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     eventId: job._id, // MongoDB _id as string
      //     eventName: job.eventName,
      //     date: job.date,
      //     location: job.location,
      //     category: job.category || "General",
      //     userEmail: formValues.email,
      //     userName: formValues.name,
      //     phone: formValues.phone,
      //     numberOfTickets: parseInt(formValues.tickets),
      //     paymentMethod: formValues.payment || "",
      //     registrationFee: job.registrationFee * parseInt(formValues.tickets),
      //     bookedAt: new Date().toISOString(),
      //   }),
      // });



      const res = await fetch("https://noooo-five.vercel.app/bookings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    eventId: job._id,        // send string _id
    eventName: job.eventName,
    date: job.date,
    location: job.location,
    category: job.category || "General",
    userEmail: formValues.email,
    userName: formValues.name,
    phone: formValues.phone,
    numberOfTickets: parseInt(formValues.tickets),
    paymentMethod: formValues.payment || "",
    registrationFee: job.registrationFee * parseInt(formValues.tickets),
    bookedAt: new Date().toISOString(),
  }),
});


      if (res.status === 409) {
        setDisabled(true);
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      if (!res.ok) throw new Error("Failed to register");

      setDisabled(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Confirmed",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Registration Failed", text: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center py-12 px-4">
      <div className="bg-blue-800 text-white rounded-2xl shadow-xl w-full max-w-4xl p-8 space-y-6">
        <h1 className="text-4xl font-bold border-b border-blue-600 pb-2">{job.eventName}</h1>

        <div className="space-y-3">
          <p><b>Description:</b> {job.description}</p>
          <p><b>Organizer:</b> {job.organizer}</p>
         <p><b>Date:</b> {new Date(job.date).toLocaleString()}</p>

          <p><b>Location:</b> {job.location}</p>
          <p><b>Category:</b> {job.category || "General"}</p>
          <p><b>Deadline:</b> {new Date(job.registrationDeadline).toLocaleDateString()}</p>
          <p><b>Available Seats:</b> {job.availableSeats}</p>
          <p><b>Fee:</b> {job.registrationFee === 0 ? "Free" : `$${job.registrationFee}`}</p>

          <button
            onClick={handleRegister}
            disabled={disabled}
            className={`btn btn-primary w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {disabled ? "Already Registered" : "Register Now"}
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/BrowseTask")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold"
          >
            Back to BrowseTask
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

