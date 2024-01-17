import React, { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import axios from "axios";
import Pagination from "./../components/Pagination";
import Loading from "./../components/Loading";

function EventManage() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(25);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8800/api/all-event");
      const fetchedEvents = response.data.events;
      setEvents(fetchedEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };
  const imageBaseUrl = "http://localhost:8800/uploads";

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-between gap-12 container mx-auto py-8 px-12">
      <CreateEvent setEvents={setEvents} />
      <div className="w-2/3 mt-7">
        <div className="flex justify-between items-center pr-4">
          <h1 className="py-4 text-xl font-bold">Event List</h1>
          <Pagination
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="h-[528px] border overflow-y-auto px-8 py-10">
          {events
            ?.slice()
            .reverse()
            .map((event, i) => (
              <div
                key={i}
                className="flex justify-between pr-24 border p-4 rounded-lg gap-4 my-2 items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`${imageBaseUrl}/${event.image}`}
                    alt="banner"
                  />
                  <p>
                    <strong>Title:</strong> {event.title},{" "}
                    <strong>Schedule:</strong>
                    {event.schedule}
                  </p>
                </div>
                <div className="flex gap-10">
                  <div
                    className="tooltip"
                    data-tip="view"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-sky-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <div
                    className="tooltip"
                    data-tip="edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                  <div
                    className="tooltip"
                    data-tip="delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EventManage;
