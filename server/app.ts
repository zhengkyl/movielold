import express from "express";
import cors from "cors"
import path from "path"

import apiRoutes from "./routes/routes"

const app = express();

// Initialize Middleware
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true })); // allow url encoded data

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(cors()) // TODO figure this out
app.use("/api/v1", apiRoutes)


export default app
