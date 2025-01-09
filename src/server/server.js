const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://vitsha:VITSHa%4097@users.o8nhn.mongodb.net/?retryWrites=true&w=majority&appName=Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Routes

// User Registration
app.post("/register", async (req, res) => {
    const { name, surname, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        surname,
        email,
        password: hashedPassword,
        role: role || "user", // Default to "user" if no role is specified
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

// User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, "7726b84afc29cc1eecac468c8375f07172b0e7d82b3938f9b75184c2e6abf5ee8f0fe664522f99931d8a566f992ccdb0af870ef292f89bc270964ff0da1b42bd3f9d596cbd95916feb35e7c5d0ff246559af698b57827679cd8acecce7331fe05be83168f1187729fbe0c19c49f9a5ac5c9a9fd02723c2b5e3fc8a5edd65832f", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token, role: user.role });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
