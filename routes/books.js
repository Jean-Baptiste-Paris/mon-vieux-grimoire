const express = require('express')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const booksCtrl = require('../controllers/books')
const router = express.Router()

router.post('/', auth, multer, booksCtrl.createBook)
router.get('/:id', auth, booksCtrl.getOneBook)
router.get('/', auth, booksCtrl.getAllBooks)
router.put('/:id', auth, multer, booksCtrl.modifyBook)
router.delete('/:id', auth, booksCtrl.deleteBook)

module.exports = router
