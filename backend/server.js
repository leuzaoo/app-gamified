import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} in use. Try another one.`);
    process.exit(1);
  } else {
    console.error("Server error: ", err.message);
  }
});

process.on("SIGINT", async () => {
  console.log("Closing server...");
  await pool.end();
  process.exit();
});
