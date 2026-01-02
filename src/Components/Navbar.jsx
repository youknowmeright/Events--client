import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Firebase/AuthContext';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { user, logOut ,profile} = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive ? "border-b-2 border-cyan-500 pb-1 font-extrabold" : "pb-1";

  const handleSignOut = () => {
     sessionStorage.removeItem("isAdmin");

    logOut();
     navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm flex flex-row justify-between px-6">
      {/* Logo */}
      <div>
        <Link to="/" className="btn btn-ghost text-xl">Events🤖</Link>
      </div>

      {/* Center links */}
      <div className="space-x-5">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/BrowseTask" className={linkClass}>Events</NavLink>
        <NavLink to="/AddTask" className={linkClass}>Add Events</NavLink>
        <NavLink to="/PostedTask" className={linkClass}>My Events</NavLink>
      </div>

      {/* Right side: User */}
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Avatar button */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full border border-gray-400">
                <img
                  alt={user.displayName || "User avatar"}
                  src={user.photoURL || "https://i.ibb.co.com/tp2XD6YW/download.jpg"}
                />
              </div>
            </label>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60"
            >
              <li className="mb-2">
                <span className="font-semibold text-lg">{profile.name || "User"}</span>
                <span className="text-sm text-gray-500">{profile.email}</span>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 border rounded-md border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
                <Link to="/update" className="ml-2 px-3 py-1 border rounded-md border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
                  Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/Login"
              className="px-3 py-1 text-sm border rounded-md border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/Register"
              className="px-3 py-1 text-sm border rounded-md border-secondary text-secondary hover:bg-secondary hover:text-white transition"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
