import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const { id, price, title, description, date, venue } = event;
 
  
  const inputDate = new Date(date);
  const options = { day: "numeric", month: "short" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  const [month, day] = formattedDate.split(" ");

  const navigate = useNavigate();
  const navigateDetails = () => {
    navigate(`/events/${id}`);
  };
  return (
    <div className="container mx-auto space-y-8 shadow-lg my-20 relative p-8">
      {/* top part  */}
      <div>
        <img
          className="w-[60px] border h-[60px] object-cover rounded-full p-2 bg-slate-100"
          src="https://source.unsplash.com/random"
          alt=""
        />
        {/* Price Ribbon SVG  */}
        <div className="absolute -top-4 -right-[20px]">
          <div className="w-full h-full relative">
            {/* svg  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="120"
              height="120"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
              className=""
            >
              <defs>
                <linearGradient
                  id="skyGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#0095FF", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#87CEFA", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <g>
                <path
                  d="M384 0H149.333c-41.237 0-74.667 33.429-74.667 74.667v426.667a10.668 10.668 0 0 0 6.592 9.856c1.291.538 2.676.813 4.075.811a10.663 10.663 0 0 0 7.552-3.115l120.448-120.619C260.48 434.795 325.44 499.2 332.416 507.136c3.261 4.906 9.882 6.24 14.788 2.979a10.67 10.67 0 0 0 3.964-4.835 6.53 6.53 0 0 0 .832-3.947v-448c0-17.673 14.327-32 32-32 5.891 0 10.667-4.776 10.667-10.667S389.891 0 384 0z"
                  style={{ fill: "url(#skyGradient)" }}
                />{" "}
                <path
                  d="M394.667 0c23.564 0 42.667 19.103 42.667 42.667v32c0 5.891-4.776 10.667-10.667 10.667H352V42.667C352 19.103 371.103 0 394.667 0z"
                  style={{ fill: "#1976d2" }}
                />
              </g>
            </svg>
            {/* Price  */}
            <div className="absolute top-6 left-10 text-white text-xl font-semibold flex flex-col">
              <span>
                {/* <sub className="font-normal text-sm">$</sub> */}
                <span className="text-2xl font-bold">10</span>
              </span>
              <span className="text-sm font-normal">02</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-500 font-semibold capitalize">
          Venue - {venue}
        </p>
        <h3 className="text-2xl font-semibold text-slate-800 pb-2">{title}</h3>
        <p className="text-justify">data ...</p>
        <p className="text-xl text-sky-600 font-bold">
          Enrollment Fee - $100
        </p>
        <div className="pt-4 flex justify-center">
          <button
            onClick={navigateDetails}
            className="w-full h-10 mx-10 border-2 border-sky-300 text-sky-800 font-black rounded-full hover:text-white hover:bg-sky-300 duration-300 relative group"
          >
            <span className="absolute w-12 group-hover:w-[93%] duration-300 flex group-hover:justify-start rounded-full inset-2 bg-sky-300 group-hover:bg-sky-500 group-hover:duration-500 -z-10"></span>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
