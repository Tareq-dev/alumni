import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "./../components/Loading";

function CreateEvent({ setEvents }) {
  const [fileInputVisible, setFileInputVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    schedule: "",
    date_created: "",
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("content", formData.content);
      formDataObj.append("schedule", formData.schedule);
      formDataObj.append("date_created", formData.date_created);
      formDataObj.append("image", formData.image);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8800/api/create-event",
        formDataObj
      );

      if (response.data.success) {
        setLoading(false);
        const newData = response.data.data;
        console.log(newData);
        setEvents((setEvents) => [...setEvents, newData]);
        toast.success(`${response.data.message}`);
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: "",
          content: "",
          schedule: "",
          date_created: "",
          image: null,
        }));
      }
    } catch (error) {
      toast.error(`${error?.response.data.message}`);
      setLoading(false);
      // console.error("Error:", error);
    }
  };
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div className="w-1/3 mt-3 p-5">
      <h1 className="py-4 text-xl text-center font-bold">Create Event List</h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" shadow p-5"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="2"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="schedule"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Schedule:
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date_created"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date Created:
          </label>
          <input
            type="text"
            id="date_created"
            name="date_created"
            value={formData.date_created}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image:
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className=" flex justify-center">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Uploading.." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
