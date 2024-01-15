import fileSystem from "fs";
import { imgUploader } from "../utils/imgUpload.js";

const events = async (req, res) => {
  const { title, content, schedule, date_created } = req.body;
  try {
    const image = req.files.image;
    const imgFileName = await imgUploader(image, res);
    console.log("file upload successfully");
    // res.send("file upload successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
};

export { events };
