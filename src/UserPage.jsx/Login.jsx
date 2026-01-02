

// import React, { useContext } from "react";
// import { Link, useNavigate, useLocation } from "react-router";
// import Swal from "sweetalert2";
// import { GoogleAuthProvider } from "firebase/auth";
// import { AuthContext } from "../Firebase/AuthContext";

// const Login = () => {
//   const { signIn, goggle } = useContext(AuthContext);
//   const provider = new GoogleAuthProvider();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     signIn(email, password)
//       .then(() => {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Log In Successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: error.message,
//         });
//       });
//   };

//   const handleGoogleLogin = () => {
//     goggle(provider)
//       .then(() => {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Login Successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Google Login Failed",
//           text: error.message,
//         });
//       });
//   };

//   return (
//     <div className="hero bg-base-200 min-h-screen">
//       <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <h1 className="text-4xl font-bold mb-4">Login</h1>

//             <label className="label">Email</label>
//             <input type="email" name="email" className="input" required />

//             <label className="label">Password</label>
//             <input type="password" name="password" className="input" required />

//             <p className="text-sm mt-2">
//               Don’t have an account?{" "}
//               <Link to="/Register" className="text-blue-600">
//                 Register
//               </Link>
//             </p>

//             <button className="btn btn-neutral mt-4 w-full">
//               Login
//             </button>
//           </form>

//           <button
//             onClick={handleGoogleLogin}
//             className="btn bg-white text-black border mt-3"
//           >
//             Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Firebase/AuthContext";

const ADMIN_EMAIL = "admin@event.com";
const ADMIN_PASSWORD = "Admin12333";

const Login = () => {
  const { signIn, goggle } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        // ✅ ADMIN CHECK
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          sessionStorage.setItem("isAdmin", "true");
        } else {
          sessionStorage.removeItem("isAdmin");
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    goggle(provider)
      .then(() => {
        // ❌ Google users are NOT admin
        sessionStorage.removeItem("isAdmin");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold mb-4">Login</h1>

            <label className="label">Email</label>
            <input type="email" name="email" className="input" required />

            <label className="label">Password</label>
            <input type="password" name="password" className="input" required />

            <p className="text-sm mt-2">
              Don’t have an account?{" "}
              <Link to="/Register" className="text-blue-600">
                Register
              </Link>
            </p>

            <button className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border mt-3"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



