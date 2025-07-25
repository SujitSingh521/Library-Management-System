import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/library")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(" Server running on http://localhost:PORT"));
