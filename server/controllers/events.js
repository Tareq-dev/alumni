import express from "express";
import fileSystem from "fs";
import { imgUploader } from "../utils/imgUpload.js";
const app = express();

const events = async (req, res) => {
  const image = req.file;
  const { title, content, schedule, date_created } = req.body;
  try {
    const imgFileName = await imgUploader(image);

    // Now you have imgFileName, you can use it in your logic
    console.log({ title, content, schedule, imgFileName, date_created });

    // Send response or perform other actions
    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
};

export { events };
