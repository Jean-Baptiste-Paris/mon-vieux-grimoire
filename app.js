require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')

const app = express()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@opencluster.3lctlmv.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=OpenCluster`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) =>
    console.log('Connexion à MongoDB échouée. Erreur : ', error.message)
  )

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/api/books', booksRoutes)
app.use('/api/auth', userRoutes)
app.use(
  '/uploads/images',
  express.static(path.join(__dirname, 'uploads/images'))
)

module.exports = app
