const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String
});

module.exports = mongoose.model("book", bookSchema);
