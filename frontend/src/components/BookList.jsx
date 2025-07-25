import React, { useEffect, useState } from "react";
import axios from "axios";


function BookList() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ title: "", author: "", category: "", status: "" });

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/books", { params: filters });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  const toggleStatus = async (id, currentStatus) => {
    const updated = {
      status: currentStatus === "Available" ? "Issued" : "Available",
      dateOfIssue: currentStatus === "Available" ? new Date() : null,
      returnDate: currentStatus === "Available" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
    };
    await axios.patch(`http://localhost:5000/books/${id}`, updated);
    fetchBooks();
  };

  return (
    <div>
      <h2>📖 Book List</h2>
      <div className="filter-box">
        <input placeholder="Search by title" onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <input placeholder="Author" onChange={(e) => setFilters({ ...filters, author: e.target.value })} />
        <input placeholder="Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>

      <div className="book-grid">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book._id}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              <p><strong>Status:</strong> {book.status}</p>
              <div className="actions">
                <button onClick={() => toggleStatus(book._id, book.status)}>
                  {book.status === "Available" ? "Issue" : "Return"}
                </button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
