import React, { useState } from "react";
import axios from "axios";


function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    price: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, category, image, price } = book;
    if (!title || !author || !category || !image || !price)
      return alert("All fields are required!");
    await axios.post("http://localhost:5000/books", book);
    alert("Book added successfully!");
    setBook({ title: "", author: "", category: "", image: "", price: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>➕ Add New Book</h2>
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
      <input name="category" placeholder="Category" value={book.category} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={book.image} onChange={handleChange} />
      <input name="price" placeholder="Price (₹)" value={book.price} onChange={handleChange} />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
