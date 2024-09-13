// Import required packages
const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const qrcode = require("qrcode");
const User = require("../schema/UserSchema");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "socp_employees",
    format: async (req, file) => "png", // Restrict format to png
    public_id: (req, file) => uuidv4(), // Unique identifier for the image
  },
});

const upload = multer({ storage });

// Middleware to handle multiple file uploads
const uploadFields = upload.fields([
  { name: "empImage", maxCount: 1 },
  { name: "empSignature", maxCount: 1 },
  { name: "managerSignature", maxCount: 1 },
]);

// Create new user
router.post("/", uploadFields, async (req, res) => {
  try {
    const aadhar = req.body.Aadhar;
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this Aadhar No. already exists." });
    }

    const userFields = { ...req.body };

    // Ensure images are properly attached from Cloudinary response
    if (req.files.empImage && req.files.empImage[0]) {
      userFields.empImage =
        req.files.empImage[0].path || req.files.empImage[0].secure_url; // Cloudinary provides path
      userFields.empImageId =
        req.files.empImage[0].filename || req.files.empImage[0].public_id; // public_id
    }
    if (req.files.empSignature && req.files.empSignature[0]) {
      userFields.empSignature =
        req.files.empSignature[0].path || req.files.empSignature[0].secure_url;
      userFields.empSignatureId =
        req.files.empSignature[0].filename ||
        req.files.empSignature[0].public_id;
    }
    if (req.files.managerSignature && req.files.managerSignature[0]) {
      userFields.managerSignature =
        req.files.managerSignature[0].path ||
        req.files.managerSignature[0].secure_url;
      userFields.managerSignatureId =
        req.files.managerSignature[0].filename ||
        req.files.managerSignature[0].public_id;
    }

    // Create a new user instance with attached image URLs
    const newUser = new User(userFields);

    // Construct URL to specific user details section
    const userDetailsUrl = `https://socp-minepersonnel.onrender.com/id-card/${aadhar}`;

    // Generate QR code with just the URL
    const qrCodeData = await qrcode.toDataURL(userDetailsUrl);
    newUser.qrCode = qrCodeData;

    const savedUser = await newUser.save();

    res.status(201).json({ message: "New User Created", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put("/:aadhar", uploadFields, async (req, res) => {
  const { aadhar } = req.params;
  try {
    // Find the user by Aadhar
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create an object to store updated fields
    const updatedFields = { ...req.body };

    // Handle image uploads and update fields
    if (req.files && req.files.empImage && req.files.empImage[0]) {
      if (existingUser.empImageId) {
        await cloudinary.uploader.destroy(existingUser.empImageId); // Delete old image from Cloudinary
      }
      updatedFields.empImage =
        req.files.empImage[0].path || req.files.empImage[0].secure_url; // Use secure_url for new image
      updatedFields.empImageId =
        req.files.empImage[0].filename || req.files.empImage[0].public_id; // Use public_id for new image
    }

    if (req.files && req.files.empSignature && req.files.empSignature[0]) {
      if (existingUser.empSignatureId) {
        await cloudinary.uploader.destroy(existingUser.empSignatureId); // Delete old signature from Cloudinary
      }
      updatedFields.empSignature =
        req.files.empSignature[0].path || req.files.empSignature[0].secure_url; // Use secure_url for new signature
      updatedFields.empSignatureId =
        req.files.empSignature[0].filename ||
        req.files.empSignature[0].public_id; // Use public_id for new signature
    }

    if (
      req.files &&
      req.files.managerSignature &&
      req.files.managerSignature[0]
    ) {
      if (existingUser.managerSignatureId) {
        await cloudinary.uploader.destroy(existingUser.managerSignatureId); // Delete old manager signature from Cloudinary
      }
      updatedFields.managerSignature =
        req.files.managerSignature[0].path ||
        req.files.managerSignature[0].secure_url; // Use secure_url for new manager signature
      updatedFields.managerSignatureId =
        req.files.managerSignature[0].filename ||
        req.files.managerSignature[0].public_id; // Use public_id for new manager signature
    }

    // Parse the updates from the request body
    const updates = JSON.parse(req.body.updates || "[]");

    // Apply field updates from the request
    updates.forEach((update) => {
      updatedFields[update.field] = update.value;
    });

    // Update the user in the database with new data
    const updatedUser = await User.findOneAndUpdate(
      { Aadhar: aadhar },
      { $set: updatedFields }, // Use $set to update only specified fields
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({ message: "User Details Updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete User
router.delete("/:aadhar", async (req, res) => {
  const { aadhar } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ Aadhar: aadhar });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove associated Cloudinary files
    if (deletedUser.empImageId) {
      await cloudinary.uploader.destroy(deletedUser.empImageId); // Remove image using public_id
    }
    if (deletedUser.empSignatureId) {
      await cloudinary.uploader.destroy(deletedUser.empSignatureId); // Remove signature
    }
    if (deletedUser.managerSignatureId) {
      await cloudinary.uploader.destroy(deletedUser.managerSignatureId); // Remove manager signature
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by Aadhar
router.get("/:aadhar", async (req, res) => {
  const { aadhar } = req.params;
  try {
    const existingUser = await User.findOne({ Aadhar: aadhar });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
