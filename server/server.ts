import mongoose from "mongoose";
import express from "express";
import cors from "cors"

import authRoutes from "./routes/auth";
import reviewRoutes from "./routes/review";
import searchRoutes from "./routes/search"
import config from "./config/config"

const app = express();

// Initialize Middleware
app.use(cors())
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true })); // allow url encoded data

app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/search", searchRoutes);

console.log(config)

mongoose
  .connect(config.db.uri)
  .then(() => {
    app.listen(config.app.port, () => console.log(`Listening on PORT ${config.app.port}...`));
  })
  .catch((err) => console.log(err.message));
