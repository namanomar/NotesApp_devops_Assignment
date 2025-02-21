import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully.");
  initDB(); // Run DB initialization after connection is established
}).catch(err => console.error("Error connecting to MongoDB:", err));

// Define Note Schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  bio: String,
});

const UserDetails = mongoose.model("UserDetails", userSchema);

// Initialize Database with Default User
const initDB = async () => {
  try {
    const existing = await UserDetails.findOne();
    if (!existing) {
      await UserDetails.create({
        name: "Naman Omar",
        rollNumber: "2022BCD0049",
        bio: "Hey There nice to meet u"
      });
      console.log("Initial data inserted.");
    } else {
      console.log("Data already exists.");
    }
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
};

// API Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

app.put("/notes/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedNote);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
