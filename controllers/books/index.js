const getAllBooks = require('./getAllCtrl')
const getOneBook = require('./getOneCtrl')
const getBestRated = require('./getBestCtrl')
const createBook = require('./createCtrl')
const updateBook = require('./updateCtrl')
const deleteBook = require('./deleteCtrl')
const rateBook = require('./rateCtrl')

module.exports = {
  getAllBooks,
  getOneBook,
  getBestRated,
  createBook,
  updateBook,
  deleteBook,
  rateBook,
}
