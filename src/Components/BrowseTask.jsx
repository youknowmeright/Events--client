import React from "react";
import { NavLink, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";

const MyPostedTask = () => {
  const myJobs = useLoaderData();

  const [disabled, setDisabled] = useState(false);
  const handleBid = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You have Successfully Applied",
      showConfirmButton: false,
      timer: 1500,
    });
    setDisabled(true); // disable button after click
  };

  return (
    <div className="bg-blue-900 min-h-screen p-8 flex flex-col items-center space-y-6">
      <h1 className="text-5xl font-extrabold text-white mb-8">Events</h1>

      {myJobs.length === 0 ? (
        <p className="text-white text-xl">
          You have not posted any events yet.
        </p>
      ) : (
        myJobs.map((job) => (
          <div
            key={job._id}
            className="bg-blue-800 text-white rounded-xl p-6 w-full max-w-4xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3 border-b border-blue-600 pb-2">
              {job.eventName}
            </h2>
            {/* <p>
              <span className="font-semibold">Description:</span>{" "}
              {job.description}
            </p>
            <p>
              <span className="font-semibold">Priority:</span> {job.priority}
            </p>
            <p>
              <span className="font-semibold">Deadline:</span> {job.deadline}
            </p>
            <p>
              <span className="font-semibold">Skill:</span> {job.skill}
            </p>
            <p>
              <span className="font-semibold">Budget:</span> ${job.budget}
            </p>
            <p>
              <span className="font-semibold">Additional Req:</span>{" "}
              {job.attachment}
            </p> */}

            <p>
                📅 {new Date(job.date).toLocaleDateString()}
              </p>

              <p>
                📍 {job.location}
              </p>

              <p>
                🎟 Available Seats: <strong>{job.availableSeats}</strong>
              </p>
              <p>
                 ➡Registration Fee: <strong>{job.registrationFee}</strong>
              </p>


            <div className="flex justify-end mt-3 space-x-3">

              <NavLink
                to={`/taskDetails/${job._id}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Details
              </NavLink>

            

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPostedTask;
