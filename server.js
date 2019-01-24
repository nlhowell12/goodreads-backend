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

const books = require('./routes/books.route');
const users = require('./routes/users.route');

app.use('/books', books);
app.use('/users', users);


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

app.post('/users/create', (req, res) => {
  const data = req.body;
  let newUser = new User({
    username: data.username,
    favorites: [],
    isAdmin: false,
    password: data.password
  });

  User.find({username: data.username}, (err, user) => {
    if (user.length > 0) {
      res.send(false)
    } else {
      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(true);
        }
      })
    }
  })
});

app.post('/login', (req, res) => {
  const data = req.body;
  User.find({username: data.username, password: data.password }, (err, user) => {
    if(err) {
      console.error(err);
    }
    if (user.length > 0) {
      res.send(JSON.stringify("Success"))
    } else {
      res.send(JSON.stringify("User does not exist or password is incorrect"))
    }
  })

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
