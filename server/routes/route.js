import express from "express";
import { check } from "express-validator";
import multer from "multer";
// import formidable from "express-formidable";
import {
  register,
  login,
  logout,
  resetPasswordMessage,
  resetPasswordReq,
} from "../controllers/auth.js";
import { payment } from "../controllers/payment.js";
import { events } from "../controllers/events.js";

const router = express.Router();
const app = express();
// app.use(formidable());
const RegisterValidationRules = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const LoginValidationRules = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp-uploads/"); // specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // generate unique filenames
  },
});
const upload = multer({ storage: storage });
// upload.single("image"),

router.post("/auth/register", RegisterValidationRules, register);
router.post("/auth/login", LoginValidationRules, login);
router.post("/auth/logout", logout);
router.post("/auth/reset", resetPasswordMessage);
router.post("/auth/reset-password", resetPasswordReq);
router.post("/create-checkout-session", payment);
router.post("/create-event", upload.single("image"), events);

export default router;
