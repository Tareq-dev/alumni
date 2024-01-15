import express from "express";
import authRoutes from "./routes/route.js";
import cors from "cors";
import formidable from "express-formidable";

const app = express();
const port = 8800;
app.use(formidable());

app.set("view engine", "ejs");

// Remove the separate body-parser middleware, as express.json() already includes it.
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   return res.status(200).json("Hello World!");
// });
app.get("/", function (request, result) {
  result.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
