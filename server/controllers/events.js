import express from "express";
import { imgUploader } from "../utils/imgUpload.js";
import { db } from "../db.js";

//POST
const events = async (req, res) => {
  const image = req.file;

  const { title, content, schedule, date_created } = req.body;
  try {
    if (image) {
      const imgFileName = await imgUploader(image);

      const q =
        "INSERT INTO new_event (title, content, schedule, date_created, image) VALUES (?, ?, ?, ?, ?)";

      db.query(
        q,
        [title, content, schedule, date_created, imgFileName],
        (error, data) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: "Error processing the image or inserting data",
            });
          }

          // Check if any rows were affected
          if (data.affectedRows > 0) {
            res.status(200).json({
              success: true,
              message: "Event created successfully",
              insertedId: data.insertId,
              data: {
                title,
                content,
                schedule,
                date_created,
                image: imgFileName,
              },
            });
          } else {
            res
              .status(500)
              .json({ success: false, message: "Failed to create event" });
          }
        }
      );
    } else {
      res.status(500).json({ success: false, message: "Select image again" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error processing the image" });
  }
};

//GET
const getAllEvents = async (req, res) => {
  try {
    const q = "SELECT * FROM new_event";

    db.query(q, (error, data) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Error retrieving events" });
      }

      res.status(200).json({ success: true, events: data });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving events" });
  }
};
export { events, getAllEvents };
