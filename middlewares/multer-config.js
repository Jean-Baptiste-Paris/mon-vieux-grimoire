const multer = require('multer')

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
// }

const storage = multer.memoryStorage()
module.exports = multer({ storage: storage }).single('image')

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads/images')
//   },
//   filename: (req, file, callback) => {
//     const baseName = 'monvieuxgrimoire-picture-'
//     const extension = MIME_TYPES[file.mimetype]
//     callback(null, baseName + Date.now() + '.' + extension)
//   },
// })

// module.exports = multer({ storage: storage }).single('image')
