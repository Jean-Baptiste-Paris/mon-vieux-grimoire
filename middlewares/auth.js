const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const tokenSecret = 'AhnPnktldJrOAs8wdNtPtXhdcIwKBD5b'
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, tokenSecret)
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}
