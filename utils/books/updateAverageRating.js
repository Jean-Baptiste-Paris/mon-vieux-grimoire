module.exports = (book) => {
  const ratings = book.ratings
  const total = ratings.length

  if (total === 0) {
    return book
  }

  const sum = ratings.reduce((acc, rating) => acc + rating.grade, 0)
  const averageRating = sum / total

  book.averageRating = averageRating

  return book
}
