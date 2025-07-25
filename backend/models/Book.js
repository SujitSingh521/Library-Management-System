import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  status: {
    type: String,
    enum: ["Available", "Issued"],
    default: "Available"
  },
  dateOfIssue: Date,
  returnDate: Date
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
