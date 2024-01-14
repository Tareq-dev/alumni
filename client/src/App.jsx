import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
