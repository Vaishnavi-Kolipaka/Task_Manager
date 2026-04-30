const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    origin:"https://taskmanagervk.netlify.app/",
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));
app.use("/projects", require("./routes/projects"));

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
