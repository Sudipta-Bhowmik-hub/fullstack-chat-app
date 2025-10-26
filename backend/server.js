const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const messages = []; // this must be declared at the top

app.get("/", (req, res) => {
  res.send("Backend is running on EC2!");
});

app.post("/message", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Message is required" });

  messages.push(text);
  res.status(201).json({ success: true, messages });
});
// ✅ Add this route to return all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

