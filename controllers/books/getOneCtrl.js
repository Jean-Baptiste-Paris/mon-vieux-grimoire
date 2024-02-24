const Book = require('../models/Book')

const getOneBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' })
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = getOneBook
