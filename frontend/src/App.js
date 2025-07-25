import React from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList.jsx";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📘 Library Management System</h1>
      <AddBook />
      <hr />
      <BookList />
    </div>
  );
}

export default App;
