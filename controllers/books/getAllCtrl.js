const Book = require('../../models/Book')

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = getAllBooks
