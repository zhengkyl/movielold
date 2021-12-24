import {} from 'dotenv/config'

import mongoose from "mongoose";
import express from "express";

const app = express();

// Initialize Middleware
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true })); // allow url encoded data

import authRoutes from "./routes/auth.mjs"
import reviewRoutes from "./routes/review.mjs"

app.use('/api/auth', authRoutes)
app.use('/api/review', reviewRoutes)

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(`${MONGODB_URI}`);
  console.log("mongodb connected...");
} catch (err) {
  console.log(err.message);
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
