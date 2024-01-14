import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();
const port = 8800;

// Remove the separate body-parser middleware, as express.json() already includes it.
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  return res.status(200).json("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
