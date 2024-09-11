// import required packages
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const qrcode = require("qrcode");
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

// Middleware to handle multiple file uploads
const uploadFields = upload.fields([
  { name: "empImage", maxCount: 1 },
  { name: "empSignature", maxCount: 1 },
  { name: "managerSignature", maxCount: 1 },
]);

// Helper function to remove old files
const removeOldFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Create a new user
router.post("/", uploadFields, async (req, res) => {
  try {
    const aadhar = req.body.Aadhar;
    // checking for the existing user by Aadhar number
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (existingUser) {
      return res
        .status(404)
        .json({ error: "User with this Aadhar No. already exists." });
    }
    // Attach file paths if exists
    if (req.files.empImage)
      req.body.empImage = `/uploads/${req.files.empImage[0].filename}`;
    if (req.files.empSignature)
      req.body.empSignature = `/uploads/${req.files.empSignature[0].filename}`;
    if (req.files.managerSignature)
      req.body.managerSignature = `/uploads/${req.files.managerSignature[0].filename}`;

    // Create a new user instance
    const newUser = new User(req.body);

    // Construct URL to specific user details section
    const userDetailsUrl = `https://socp-minepersonnel.onrender.com/id-card/${aadhar}`;

    // Generate QR code with just the URL (this ensures it works as a link)
    const qrCodeData = await qrcode.toDataURL(userDetailsUrl);

    newUser.qrCode = qrCodeData;
    const savedUser = await newUser.save();

    // Sending response status or message to front-end
    res.status(201).json({ message: "New User Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put("/:aadhar", uploadFields, async (req, res) => {
  const { aadhar } = req.params;
  try {
    // Find the existing user by Aadhar
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Object to hold updated fields
    const updatedFields = {};

    // Handle new image uploads and remove old files
    if (req.files && req.files.empImage) {
      if (existingUser.empImage) {
        removeOldFile(path.join(__dirname, "..", existingUser.empImage));
      }
      updatedFields.empImage = `/uploads/${req.files.empImage[0].filename}`;
    }

    if (req.files && req.files.empSignature) {
      if (existingUser.empSignature) {
        removeOldFile(path.join(__dirname, "..", existingUser.empSignature));
      }
      updatedFields.empSignature = `/uploads/${req.files.empSignature[0].filename}`;
    }

    if (req.files && req.files.managerSignature) {
      if (existingUser.managerSignature) {
        removeOldFile(
          path.join(__dirname, "..", existingUser.managerSignature)
        );
      }
      updatedFields.managerSignature = `/uploads/${req.files.managerSignature[0].filename}`;
    }

    // Parse the updates from the request body
    const updates = JSON.parse(req.body.updates || "[]");

    // Apply field updates from the request
    updates.forEach((update) => {
      updatedFields[update.field] = update.value;
    });

    // Update the user with the provided fields
    const updatedUser = await User.findOneAndUpdate(
      { Aadhar: aadhar },
      { $set: updatedFields },
      { new: true }
    );

    // Respond with updated user data
    res
      .status(200)
      .json({ message: "User Details Updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete User
router.delete("/:aadhar", async (req, res) => {
  const { aadhar } = req.params;
  try {
    // checking for existing user
    const deletedUser = await User.findOneAndDelete({ Aadhar: aadhar });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove associated files if they exist
    removeOldFile(path.join(__dirname, "..", user.empImage));
    removeOldFile(path.join(__dirname, "..", user.empSignature));
    removeOldFile(path.join(__dirname, "..", user.managerSignature));

    // Sending response status or message to front-end
    res.status(200).json({ message: "User Deleted Successfully" });
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

router.get("/:aadhar", async (req, res) => {
  const { aadhar } = req.params;
  try {
    const existingUser = await User.findOne({ Aadhar: aadhar });

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
