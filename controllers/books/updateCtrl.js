const Book = require('../../models/Book')

const updateBook = async (req, res, next) => {
  try {
    // prettier-ignore
    const bookObject = req.file ?
      {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
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

module.exports = updateBook
