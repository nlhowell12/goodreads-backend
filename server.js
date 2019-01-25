process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const books = require('routes/books.route');
const users = require('routes/users.route');

app.use('/books', books);
app.use('/users', users);

app.get("/", (req, res) => {
  res.send(`
  Welcome to Goodreads
  <a href="books/all_books">all books</a>
  `)
});

const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log("App is running at port: ", port);
  mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds163764.mlab.com:63764/goodreads-backend`);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function callback() {});
});
