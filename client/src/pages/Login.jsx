import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [register, setRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (register) {
        // User registration
        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          formData
        );
        if (res.data.status) {
          toast.success("Registration successful!");
          setToken(res.data.token);
          navigate("/");
        }
      } else {
        // User login
        const res = await axios.post(
          "http://localhost:8800/api/auth/login",
          formData
        );
        if (res.data.status) {
          toast.success("Login successful!");
          setToken(res.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("API Error:", error.response?.data.message);
      toast.error(`${error.response?.data.message}`); // Replace with your error handling
    }
  };
  return (
    <div className="flex items-center h-screen">
      <div className="w-full mx-auto lg:w-[550px] lg:h-[500px] bg-white flex items-center group relative overflow-hidden shadow-xl">
        {/* register form  */}
        <form
          className={`p-8 w-full lg:w-2/3 ${
            register ? "translate-x-0" : "-translate-x-full"
          } duration-500`}
        >
          <h1 className="backdrop-blur-sm text-4xl pb-4">Register</h1>
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="block"
            >
              Name
            </label>
            <input
              id="name"
              type="name"
              onChange={handleInputChange}
              placeholder="Jhon Doe"
              className="p-2 block w-full drop-shadow-lg outline-none border rounded-md  invalid:border-red-700 valid:border-black"
            />
            <label
              htmlFor="email"
              className="block"
            >
              Email
            </label>
            <input
              id="email"
              type="u_email"
              onChange={handleInputChange}
              placeholder="example@example.com"
              className="p-2 block w-full drop-shadow-lg outline-none border rounded-md  invalid:border-red-700 valid:border-black"
            />
            <label
              htmlFor="u_password"
              className="block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={handleInputChange}
              placeholder=".............."
              min={5}
              className="p-2 block w-full drop-shadow-lg outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />
          </div>
          {/* button type will be submit for handling form submission*/}
          <button
            onClick={handleSubmit}
            type="button"
            className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
          >
            Submit
          </button>
          <p className="mb-3 text-center">
            Already have an account?
            <Link
              onClick={() => {
                setRegister(!register);
              }}
              className="underline text-blue-600"
            >
              Login
            </Link>
          </p>
          <hr />
        </form>
        {/* img */}
        <div
          className={`absolute w-1/3 h-full top-0 z-50 min-h-full duration-500 overflow-hidden hidden lg:block  bg-sky-500 ${
            register
              ? "translate-x-full rounded-bl-full duration-500 left-48"
              : "rounded-br-full"
          }`}
        >
          <img
            src="https://source.unsplash.com/random"
            className="object-cover h-full"
            alt="img"
          />
        </div>
        {/* login form */}
        <form
          className={`p-8 w-full lg:w-2/3 mr-0 ml-auto duration-500 ${
            register ? "translate-x-full" : ""
          }`}
        >
          <h1 className="backdrop-blur-sm text-4xl pb-4">Login</h1>
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={handleInputChange}
              placeholder="example@example.com"
              className="p-2 block w-full drop-shadow-lg outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />
            <label
              htmlFor="password"
              className="block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={handleInputChange}
              placeholder=".............."
              min={5}
              className="p-2 block w-full drop-shadow-lg outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />
          </div>
          {/* button type will be submit for handling form submission*/}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
          >
            Submit
          </button>
          <p className="mb-3 text-center">
            Don't have an account?
            <Link
              onClick={() => {
                setRegister(!register);
              }}
              className="underline"
            >
              Register
            </Link>
          </p>
          <hr />
        </form>
      </div>
    </div>
  );
};
