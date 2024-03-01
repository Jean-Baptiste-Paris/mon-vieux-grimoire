const express = require('express')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const sharp = require('../middlewares/sharp-config')
const booksCtrl = require('../controllers/books')
const router = express.Router()

router.get('/bestrating', booksCtrl.getBestRated)
router.get('/', booksCtrl.getAllBooks)
router.get('/:id', booksCtrl.getOneBook)
router.post('/', auth, multer, sharp, booksCtrl.createBook)
router.put('/:id', auth, multer, sharp, booksCtrl.updateBook)
router.delete('/:id', auth, booksCtrl.deleteBook)
router.post('/:id/rating', auth, booksCtrl.rateBook)

module.exports = router
