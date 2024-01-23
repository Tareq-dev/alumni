import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    price: 95,
    description: "Join us for the latest in technology trends and innovations.",
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
    title: "Artificial Intelligence",
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
function EventDetails() {
  const { id } = useParams();
  const findingDetails = events.find((event) => event.id === Number(id));
  const { title, price, description, date, venue } = findingDetails;
  const inputDate = new Date(date);
  const options = { day: "numeric", month: "short" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const makePayment = async () => {

    console.log('click')
    const stripe = await loadStripe(
      "pk_test_51OYkaUKD2nUbbLbiczZ2Wex3kjlPoX6ca9IBZtqUe3cwiCLD5Stp5w3CueaLeZlNBCA8wKPp2HsVDSpVpaeH1pWQ00AcbfZLHR"
    );
    const body = {
      events: findingDetails,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8800/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
    console.log(result);
  };

  return (
    <div>
      <article
        className="px-4 py-14 mx-auto max-w-7xl"
        itemID="#"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
          <img
            src="https://source.unsplash.com/random"
            className="object-cover w-full h-64 bg-center rounded-lg"
            alt="Kutty"
          />
          <div className="flex justify-between py-8 items-center">
            <p className="capitalize text-sky-500 font-bold text-2xl">
              Venue - {venue}
            </p>
            <p className="text-sky-300 px-2 py-1 rounded bg-black font-bold text-xl">
              Event Date : {formattedDate}
            </p>
          </div>
          <p className="text-md text-center font-semibold">
            Enrollment Fee - ${price}
          </p>
          <div className="pt-4 flex mb-8 justify-center animate-pulse">
            <button
              onClick={makePayment}
              className="w-[150px] h-12 border-2 border-sky-300 text-sky-800 font-black rounded-full hover:text-white  duration-300 relative group"
            >
              <span className="absolute group-hover:w-[93%] duration-300 flex group-hover:justify-start rounded-full inset-2  group-hover:bg-sky-500 group-hover:duration-500 -z-10"></span>
              Enroll Event
            </button>
          </div>
          <h1
            className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
            itemProp="headline"
          >
            {title}
          </h1>
        </div>

        <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
          <p>{description}</p>
        </div>
      </article>
    </div>
  );
}

export default EventDetails;
