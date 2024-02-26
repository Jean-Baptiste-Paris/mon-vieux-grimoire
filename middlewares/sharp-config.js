require('dotenv').config()
const sharp = require('sharp')

module.exports = async (req, res, next) => {
  if (!req.file) {
    return next()
  }
  try {
    const baseName = process.env.IMAGES_BASE_NAME
    const newName = baseName + Date.now() + '.webp'
    const newPath = process.env.IMAGES_BASE_PATH + newName

    await sharp(req.file.buffer)
      .resize(300, null)
      .toFormat('webp')
      .toFile(newPath)

    req.file.filename = newName
    req.file.path = newPath

    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}
