// utils/writeToFile.js
import fs from "fs";
import path from "path";
import Book from "../models/Book.js";

const writeBooksToFile = async () => {
  const books = await Book.find({}).lean();

  // Map and assign a custom `id` starting from 1
  const mappedBooks = books.map((book, index) => ({
    id: index + 1,
    ...book,
  }));

  const data = `export const books = ${JSON.stringify(mappedBooks, null, 2)};`;

  const filePath = path.resolve("Book-data.js");
  fs.writeFileSync(filePath, data, "utf-8");
};

export default writeBooksToFile;
