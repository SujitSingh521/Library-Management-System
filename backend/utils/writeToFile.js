import fs from "fs";
import path from "path";
import Book from "../models/Book.js";

const writeBooksToFile = async () => {
  const books = await Book.find({});
  const data = `export const books = ${JSON.stringify(books, null, 2)};`;

  const filePath = path.resolve("Bookdata.js");
  fs.writeFileSync(filePath, data, "utf-8");
};

export default writeBooksToFile;
