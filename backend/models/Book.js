import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  image: String,
  price: String,
  status: {
    type: String,
    enum: ["Available", "Issued"],
    default: "Available"
  },
  dateOfIssue: Date,
  returnDate: Date
});

export default mongoose.model("Book", bookSchema);
