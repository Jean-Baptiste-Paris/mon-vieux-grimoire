const getAllBooks = require('./getAllCtrl')
const getOneBook = require('./getOneCtrl')
// const getBestBooks = require('./getBestCtrl')
const createBook = require('./createCtrl')
const updateBook = require('./updateCtrl')
const deleteBook = require('./deleteCtrl')
// const rateBooks = require('./rateCtrl')

module.exports = {
  getAllBooks,
  getOneBook,
  //   getBestBooks,
  createBook,
  updateBook,
  deleteBook,
  //   rateBooks,
}
