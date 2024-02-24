const fs = require('fs').promises
const Book = require('../models/Book')

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getOneBook = async (req, res, next) => {
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

// exports.getBestRated = (req, res, next) => {}

exports.createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject.userId

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      ratings: [],
      averageRating: 0,
      imageUrl: `${req.protocol}://${req.get('host')}/storage/images/${
        req.file.filename
      }`,
    })

    await book.save()

    res.status(201).json({ book: book })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.updateBook = async (req, res, next) => {
  try {
    // prettier-ignore
    const bookObject = req.file ?
    {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/storage/images/${req.file.filename}`
    }
    : { ...req.body }

    delete bookObject.userId
    const book = await Book.findOne({ _id: req.params.id })

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé ' })
    }

    if (book.userId != req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' })
    }

    await Book.updateOne(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id }
    )

    res.status(200).json({ message: 'Livre mis à jour' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id })

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' })
    }

    if (book.userId != req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' })
    }

    const filename = book.imageUrl.split('/images/')[1]
    await fs.unlink(`storage/images/${filename}`)
    await Book.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: 'Livre supprimé' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// exports.rateBook = (req, res, next) => {}
