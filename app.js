const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')

const app = express()

const username = 'belmongo'
const password = '4x1ICRDftT4sn9P1'
const cluster = 'opencluster.3lctlmv.mongodb.net'
const dbName = 'monvieuxgrimoire'
mongoose
  .connect(
    'mongodb+srv://belmongo:4x1ICRDftT4sn9P1@opencluster.3lctlmv.mongodb.net/?retryWrites=true&w=majority&appName=OpenCluster'
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) =>
    console.log('Connexion à MongoDB échouée. Erreur : '.error.message)
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
app.use('/images', express.static(path.join(__dirname, 'storage/images')))

app.use((error, req, res, next) => {
  console.error(error)
  res
    .status(error.status || 500)
    .json({ error: error.message || 'Erreur interne du serveur' })
})

module.exports = app
