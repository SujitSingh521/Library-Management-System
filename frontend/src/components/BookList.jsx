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

  const issueBook = async (id, currentStatus) => {
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
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input placeholder="Search by title" onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <input placeholder="Author" onChange={(e) => setFilters({ ...filters, author: e.target.value })} />
        <input placeholder="Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7">No books found</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.status}</td>
                <td>{book.dateOfIssue ? new Date(book.dateOfIssue).toLocaleDateString() : "-"}</td>
                <td>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
                <td>
                  <button onClick={() => issueBook(book._id, book.status)}>
                    {book.status === "Available" ? "Issue" : "Return"}
                  </button>
                  <button onClick={() => deleteBook(book._id)} style={{ marginLeft: "5px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
