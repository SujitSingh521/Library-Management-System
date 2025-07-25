import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// GET /books with filters
router.get("/", async (req, res) => {
  const { title, author, category, status } = req.query;
  const filter = {};

  if (title) filter.title = new RegExp(title, "i");
  if (author) filter.author = new RegExp(author, "i");
  if (category) filter.category = new RegExp(category, "i");
  if (status) filter.status = status;

  const books = await Book.find(filter);
  res.json(books);
});

// POST /books
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// DELETE /books/:id
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book Deleted" });
});

// PATCH /books/:id
router.patch("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

export default router;
