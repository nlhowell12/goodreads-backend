const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = require('./book.model').schema;

const userSchema = new Schema({
  username: String,
  favorites: [BookSchema],
  isAdmin: Boolean
});

module.exports = mongoose.model("user", userSchema);
