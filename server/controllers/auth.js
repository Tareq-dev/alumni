import { db } from "../db.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import nodemailer from "nodemailer";

const register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // CHECK FOR EXISTING USER
  const q = "SELECT * FROM registered_users WHERE email = ?";

  db.query(q, [req.body.email], (error, data) => {
    if (error) return res.json(error);
    if (data.length)
      return res
        .status(422)
        .json({ status: 0, message: "User already exists!" });
    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // return false;
    const q = "INSERT INTO registered_users (email, name, password) VALUES (?)";
    const values = [req.body.email, req.body.name, hashedPassword];
    db.query(q, [values], (error, data) => {
      // console.log("data", data);
      if (error) return res.json(error);

      const query = "SELECT * FROM registered_users WHERE id = ?";

      db.query(query, [data.insertId], (error, signInData) => {
        if (error) return res.json(error);

        const token = jwt.sign({ id: signInData[0].id }, "jwtkey");

        const { password, ...rest } = signInData[0];

        return res.status(200).json({
          status: 1,
          data: rest,
          token,
          message: "User has been created!",
        });
      });
    });
  });
};

const login = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // CHECK USER EXISTS

  const q = "SELECT * FROM registered_users WHERE email = ?";
  try {
    db.query(q, [req.body.email], (error, data) => {
      if (error) return res.json(error);

      if (data.length === 0)
        return res.status(404).json({ status: 0, message: "User not found!" });

      // CHECK PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      9;
      if (!isPasswordCorrect) {
        return res.status(400).json({ status: 0, message: "Wrong Password!" });
      }

      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...rest } = data[0];

      res
        .status(200)
        .json({ status: 1, data: rest, token, message: "Login successful!" });
    });
  } catch (error) {
    console.log(error);
  }
};

// There is very simple solution for this. Follow the following steps to send emails from your gmail using node (nodemailer)

// Step1: Open this link https://myaccount.google.com/security
// Step2: Enable 2 factor authentication
// Click on App passwords just below the 2 factor authentication
// From Select App options select Other and write your app name it could be any name like mycustomapp
// It will generate you the password copy the password from the popup and use the following code.
// Use that copied password in the Auth password section my password was this ediqcvvkjmuiurjx

const logout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ status: 1, message: "Logout successful!" });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.email_password,
  },
});

const resetPasswordMessage = (req, res) => {
  const { email } = req.body;
  const token = randomstring.generate();

  const resetLink = `https://whatsbulk.vercel.app/reset/${token}`;

  const mailOptions = {
    from: "tarequl.islalm@gmail.com",
    // to: "whatsbulk.vercel.app",
    to: `${email}`,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset for your account. Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  };
  db.query(
    "SELECT * FROM registration where email = ? limit 1",
    email,
    function (err, data) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (data.length > 0) {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          // console.log(info);

          if (info.response) {
            console.log("Email sent: " + info.response);
          }
        });
        db.query(`DELETE FROM password_reset  where email=${db.escape(email)}`);
        db.query(
          `INSERT INTO password_reset (email, token) VALUES(${db.escape(
            email
          )},'${token}')`
        );

        return res
          .status(200)
          .json({ status: 1, message: "Mail sent Successfuly" });
      }
      return res.status(201).json({ status: 0, message: "Email not exist" });
    }
  );
};

const resetPasswordReq = (req, res) => {
  const data = req.body.resetData;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data?.newPassword, salt);
  db.query(`DELETE FROM password_reset where email=' ${data?.email}'`);
  const query = `SELECT * FROM registration WHERE email = ?`;

  db.query(query, [data.email], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      db.query(
        `UPDATE registration SET password = '${hash}' where id=' ${result[0].id}'`
      );
      res
        .status(200)
        .json({ status: 1, message: "Password reset successfully" });
    }
  });
};

export { register, login, logout, resetPasswordMessage, resetPasswordReq };
