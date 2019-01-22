const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

app.use(express.json());
app.use(cors());

const Book = require("./models/book.model")

app.get("/", (req, res) => {
  let books = [];
  Book.find({}, function(err, bookList) {
    if (err) return handleError(err);

    for (let i in bookList) {
      books.push(bookList[i]);
    }
    res.send(books);
  });
});

app.post("/add", (req, res) => {
  let title = req.body.title
  let newBook = new Book({
    title: title
  });
  newBook.save((err) => {
    if (err) {
      return console.error(err);
    } else {
      res.send("book added");
    }
  });
});

app.get("/id", (req, res) => {
  let id = "5c47281b3e2132056d7dd25b"
  Book.findById(id, (err, book) => {
    if (err) return handleError(err);
    res.send(book);
  });
});

const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log("App is running at port: ", port);
  mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds163764.mlab.com:63764/goodreads-backend`);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function callback() {});
});
