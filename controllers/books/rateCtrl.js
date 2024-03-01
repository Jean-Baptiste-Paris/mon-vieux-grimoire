const Book = require('../../models/Book')

const rateBook = async (req, res, next) => {
  try {
    const grade = req.body.rating
    if (!grade) {
      return res
        .status(400)
        .json({ message: 'Requête incomplète', grade: grade })
    }
    if (!grade || grade < 0 || grade > 5) {
      return res
        .status(400)
        .json({ message: 'La note doit être comprise entre 0 et 5' })
    }

    const book = await Book.findOne({ _id: req.params.id })
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé ' })
    }

    const hasRated = book.ratings.some((rating) => rating.userId === userId)
    if (hasRated) {
      return res
        .status(400)
        .json({ message: "L'utilisateur a déjà noté ce livre" })
    }

    const rating = {
      userId: req.auth.userId,
      grade: grade,
    }
    book.ratings.push(rating)
    await updateAverageRating(book)
    await book.save()

    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ error })
  }
}

const updateAverageRating = async (book) => {
  try {
    const ratings = book.ratings
    const total = ratings.length

    if (total === 0) {
      return
    }

    const sum = ratings.reduce((acc, rating) => acc + rating.grade, 0)
    const averageRating = sum / total

    book.averageRating = averageRating
    await book.save()
  } catch (error) {
    throw error
  }
}

module.exports = rateBook
