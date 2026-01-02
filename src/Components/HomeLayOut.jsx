import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router"; // for navigation

const HomeLayOut = () => {
  const words = ["Innovate", "Build", "Learn", "Repeat!"];
  const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EF4444"];

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    fetch("https://noooo-five.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter events when search changes
  useEffect(() => {
    if (!search) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (e) =>
          e.eventName.toLowerCase().includes(search.toLowerCase()) ||
          e.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [search, events]);

  // Featured events (first 3 events)
  const featured = filteredEvents.slice(0, 3);

  // Unique categories
  const categories = [...new Set(events.map((e) => e.category))];
  const [reviews, setReviews] = useState([]);

    useEffect(() => {
    fetch("https://noooo-five.vercel.app/reviews")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReviews(data.reviews.slice(0, 3)); // show only 3
        }
      })
      .catch(err => console.error(err));
  }, []);
  console.log(reviews);

  return (
    <div className="bg-gray-900 text-white pt-10">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          <Typewriter
            words={words}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
            onType={(index) => {
              const heading = document.querySelector("h1");
              if (heading)
                heading.style.color = colors[index % colors.length];
            }}
          />
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 font-medium mb-6">
          Turning ideas into reality, one line of code at a time.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search events by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md mx-auto"
        />
      </section>

      {/* Featured Events */}
      <section className="py-12 px-6 md:px-24">
        <h2 className="text-4xl font-extrabold mb-8">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={event.image || event.imageUrl}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2">{event.eventName}</h3>
                <p className="text-gray-300 mb-1">
                  {new Date(event.date).toDateString()} | {event.location}
                </p>
                <p className="text-gray-400 mb-2">{event.category}</p>
                <button
                  onClick={() => navigate(`/taskdetails/${event._id}`)}
                  className="btn w-full bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6 md:px-24 bg-gray-800 text-center">
        <h2 className="text-4xl font-extrabold mb-8">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearch(cat)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setSearch("")}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
          >
            All
          </button>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-12 px-6 md:px-24 text-center">
      <h2 className="text-4xl font-extrabold mb-8">Recent Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review._id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <p>"{review.comment}"</p>
            <span className="block mt-4 font-bold">- {review.name}</span>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default HomeLayOut;
