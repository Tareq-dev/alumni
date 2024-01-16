import express from "express";
import fileSystem from "fs";
// import formidable from "express-formidable";
import { imgUploader } from "../utils/imgUpload.js";
const app = express();

// Apply formidable middleware

const events = async (req, res) => {
  const image = req.files;

  console.log(image);
  console.log(req.body);

  // const { title, content, schedule, date_created } = req.body;
  // console.log(req.body);
  res.json({ message: "File uploaded successfully" });
  // try {
  //   if (image) {
  //     const imgFileName = await imgUploader(image, res);
  //     console.log("file upload successfully");
  //     // res.send("file upload successfully");
  //     console.log({ title, content, schedule, imgFileName, date_created });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Error processing the image");
  // }
};

export { events };
