// import React from "react";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";

// const ADMIN_EMAIL = "admin@event.com";
// const ADMIN_PASSWORD = "Admin12333";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//       sessionStorage.setItem("isAdmin", "true");

//       Swal.fire({
//         icon: "success",
//         title: "Admin Login Successful",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       navigate("/AddTask"); // go directly to Add Event
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Admin Credentials",
//       });
//     }
//   };

//   return (
//     <div className="hero min-h-screen bg-base-200">
//       <form onSubmit={handleSubmit} className="card bg-base-100 p-6 w-96">
//         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//         <input name="email" type="email" placeholder="Admin Email" className="input mb-3" required />
//         <input name="password" type="password" placeholder="Admin Password" className="input mb-3" required />
//         <button className="btn btn-neutral w-full">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;



// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";

// const ADMIN_EMAIL = "admin@event.com";
// const ADMIN_PASSWORD = "Admin12333";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//       // ✅ SET ADMIN FLAG ONCE
//       sessionStorage.setItem("isAdmin", "true");

//       Swal.fire({
//         icon: "success",
//         title: "Admin Login Successful",
//         timer: 1200,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate("/add-event"); // go directly
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Credentials",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-950">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded space-y-4 w-96"
//       >
//         <h2 className="text-2xl font-bold text-center">Admin Login</h2>

//         <input
//           type="email"
//           placeholder="Admin Email"
//           className="input w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Admin Password"
//           className="input w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="btn w-full bg-blue-900 text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ADMIN_EMAIL = "admin@event.com";
const ADMIN_PASSWORD = "Admin12333";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // ✅ SET ADMIN SESSION ONCE
      sessionStorage.setItem("isAdmin", "true");

      Swal.fire({
        icon: "success",
        title: "Admin Logged In",
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        navigate("/add-event");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Admin Credentials",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;


