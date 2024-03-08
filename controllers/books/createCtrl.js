const Book = require('../../models/Book')
const updateAverageRating = require('../../utils/books/updateAverageRating')

const createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject.userId

    const updatedBookObject = updateAverageRating(bookObject)

    const book = new Book({
      ...updatedBookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/images/${
        req.file.filename
      }`,
    })

    await book.save()

    res.status(201).json({ book: book })
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = createBook
