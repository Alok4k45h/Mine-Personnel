// creating app server using express and importing the required modules
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// importing routes file
const userRoute = require("./routes/user");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Establishing connection with mongodb atlas
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongodb connected successfully")) //after succussfull connection, displaying successfull message
  .catch((err) => console.log(err)); // after failure, displaying error message

const port = process.env.PORT || 5000;
// telling app server to use all imported file
app.use(cors());
app.use("/backend/user", userRoute);

// app server listening on port 5000 with displaying successful connection message
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
