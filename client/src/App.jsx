import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUS from "./pages/AboutUS";
import ContactUs from "./pages/ContactUs";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import Success from "./components/Success";
import Cencel from "./components/Cencel";
import EventManage from "./pages/EventManage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/about-us"
          element={<AboutUS />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs />}
        />
        <Route
          path="/events"
          element={<Events />}
        />
        <Route
          path="/events/:id"
          element={<EventDetails />}
        />
        <Route
          path="/create-event"
          element={<EventManage />}
        />
        <Route
          path="/success"
          element={<Success />}
        />
        <Route
          path="/cencel"
          element={<Cencel />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
