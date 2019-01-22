const Book = require('../models/book.model');

exports.all_books = function (req, res) {

  let books = [];
  Book.find({}, function (err, bookList) {
    if (err) return handleError(err);

    for (let i in bookList) {
      books.push(bookList[i]);
    }
    res.send(books);
  });

};

exports.add_book = function (req, res) {

  let newBook = new Book({
    title: req.body.title
  });

  newBook.save((err) => {
    if (err) {
      return console.error(err);
    } else {
      res.send("book added");
    }
  });

};

exports.book_details = function (req, res) {

  Book.findById(req.params.id, function (err, book) {
    if (err) return next(err);
    res.send(book);
  })

};