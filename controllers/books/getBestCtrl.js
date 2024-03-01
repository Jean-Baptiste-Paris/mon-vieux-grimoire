const Book = require('../../models/Book')

const getBestRated = async (req, res, next) => {
  try {
    const bestRatedBooks = await Book.find()
      .sort({ averageRating: -1 })
      .limit(3)

    res.status(200).json(bestRatedBooks)
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = getBestRated
