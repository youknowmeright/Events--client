import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthContext";

const EditProfile = () => {
  const { user } = useContext(AuthContext); // Firebase user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { profile ,setProfile } = useContext(AuthContext);

  // Initialize with current Firebase user info
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Save updated info in localStorage or sessionStorage for global access
    sessionStorage.setItem("profile", JSON.stringify({ name, email }));
    setProfile({ name, email });

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your name and email have been updated successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-blue-950 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-base-100 p-10 rounded-lg w-full max-w-md shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Edit Profile
        </h1>

        <div className="flex flex-col">
          <label className="text-white mb-1">Name</label>
          <input
            type="text"
            className="input w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white mb-1">Email</label>
          <input
            type="email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn w-full mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
