<!-- server.js -->

const express =require ('express');
const app =express();

app.get("/",(req,res)=>{
res.status(200).send('<h1>Welcome to the Backend Server</h1>');
})

const PORT =5000;

app.listen(PORT,()=>{
console.log(`server is running on Port ${PORT}`);
})

<!-- 📚 Library Book Management Backend -->

A Node.js + Express.js backend with MongoDB to manage books in a library.

<!-- 🚀 Features -->

Add, update, delete books
Filter books by title, author, category, and status
Mark books as Issued or Available
Save all books to a local Book-data.js file with a custom id (starting from 1)
<!-- 🛠️ Tech Stack -->

Node.js
Express.js
MongoDB with Mongoose
CORS, JSON middleware
File system for exporting data



<!-- 📁 Folder Structure  -->
.
├── models/
│   └── Book.js
├── routes/
│   └── bookRoutes.js
├── utils/
│   └── writeToFile.js
├── Book-data.js
├── .env
├── server.js
├── Read.md



<!--  Installation Command: -->
npm install express mongoose cors dotenv nodemon

<!-- backend run/ start -->
npm run server

