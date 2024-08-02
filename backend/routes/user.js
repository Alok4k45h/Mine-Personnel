// import required packages
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const User = require("../schema/UserSchema");

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Create a new user
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const aadhar = req.body.Aadhar;
    // checking for the existing user by Aadhar number
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (existingUser) {
      return res
        .status(404)
        .json({ error: "User with this Aadhar No. already exists." });
    }

    // Attach image file path if exists
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    // Create a new user instance & save it to database
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    // Sending response status or message to front-end
    res.status(200).json({ message: "New User Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update specific user using Aadhar No.
router.put("/:aadhar", upload.single("image"), async (req, res) => {
  const { aadhar } = req.params;
  try {
    // checking for existing user
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Parse the updates from the request body
    const updates = JSON.parse(req.body.updates || "[]");
    const updatedFields = {};

    // updating each field value recieved from frontend
    updates.forEach((update) => {
      updatedFields[update.field] = update.value;
    });

    // Handle the image file if it's uploaded
    if (req.file) {
      if (existingUser.image) {
        fs.unlinkSync(path.join(__dirname, "..", existingUser.image));
      }
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    // Update the user with only provided fields
    const updatedUser = await User.findOneAndUpdate(
      { Aadhar: aadhar },
      { $set: updatedFields },
      { new: true }
    );

    // sending response status and message to frontend
    res
      .status(200)
      .json({ message: "User Details Updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete specific user by Aadhar number
router.delete("/:aadhar", async (req, res) => {
  const { aadhar } = req.params;
  try {
    // checking for existing user
    const deletedUser = await User.findOneAndDelete({ Aadhar: aadhar });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Remove the user's image from the file system if it exists
    if (user.image) {
      const imagePath = path.join(__dirname, "..", user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    // Sending response status or message to front-end
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users from database and send them to frontend
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
