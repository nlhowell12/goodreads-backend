const express = require('express');
const router = express.Router();

const books_controller = require('controllers/books.controller');

router.get('/all_books', books_controller.all_books);
router.post('/add_book', books_controller.add_book);
router.get('/:id', books_controller.book_details);

module.exports = router;