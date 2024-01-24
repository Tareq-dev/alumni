import React, { useState, useEffect } from "react";
import EventCard from "./../components/EventCard";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "../axios/useAxiosSecure";

function Events() {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState("");
  const { authEmail } = useAuth();
  const axiosInstance = useAxiosSecure();
  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      price: 95,
      description:
        "Join us for the latest in technology trends and innovations.",
      date: "2024-04-15",
      venue: "Convention Center",
    },
    {
      id: 2,
      title: "Annual Alumni Reunion",
      price: 195,
      description: "Celebrate and reconnect with old friends and classmates.",
      date: "2024-05-20",
      venue: "Grand Ballroom",
    },
    {
      id: 3,
      title: "Career Fair & Networking",
      price: 250,
      description:
        "Connect with potential employers and expand your professional network.",
      date: "2024-06-10",
      venue: "Career Center",
    },
    {
      id: 4,
      title: "Summer Hackathon",
      price: 185,
      description:
        "Join our annual Summer Hackathon and showcase your coding skills. This event is open to developers, programmers, and technology enthusiasts. Bring your innovative ideas and collaborate with like-minded individuals. It's a fantastic opportunity to learn, create, and network.",
      date: "2024-07-15",
      venue: "Innovation Hub",
    },
    {
      id: 5,
      title: "Artificial Intelligence ",
      price: 110,
      description:
        "Explore the world of Artificial Intelligence at our symposium. Learn from industry experts, participate in hands-on workshops, and discover the impact of AI on various sectors. Whether you're a beginner or an AI enthusiast, this event offers valuable insights and networking opportunities.",
      date: "2024-08-22",
      venue: "Tech Hub",
    },
    {
      id: 6,
      title: "Digital Marketing Summit",
      price: 125,
      description:
        "Stay ahead in the rapidly evolving world of digital marketing. Our summit brings together marketing professionals, industry leaders, and experts to discuss the latest trends, strategies, and tools in digital marketing. Join us for a day of knowledge-sharing and networking.",
      date: "2024-09-30",
      venue: "Marketing Center",
    },
    // Add more events as needed
  ];
  useEffect(() => {
    const fetchData = async () => {
      // if (authEmail) {

      // } else {
      //   setError("Login to see events");
      // }
      try {
        const response = await axiosInstance(`/all-event?email=${authEmail}`);
        setEventData(response.data.events);
      } catch (error) {
        console.log(error);
        // setError(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 container mx-auto">
      {/* Events List Section */}
      <section className="py-16 px-12">
        {error ? (
          <p className="text-center text-3xl text-red-400 py-28">{error}</p>
        ) : (
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Upcoming Events
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 px-12 justify-items-center gap-8">
              {/* Event Card - Repeat for each event */}
              {eventData.map((event, i) => (
                <EventCard event={event} key={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Events;
