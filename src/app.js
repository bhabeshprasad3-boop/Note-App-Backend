const express = require("express");
const authRouter = require("./routes/auth.route");
const noteRouter = require("./routes/note.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/db"); 
require("dotenv").config();

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://note-app-frontend-sage.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", noteRouter);

module.exports = app;