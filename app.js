const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/Book')

const app = express()

const username = encodeURIComponent('belmongo')
const password = encodeURIComponent('4x1ICRDftT4sn9P1')
const cluster = 'opencluster.3lctlmv.mongodb.net'
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=OpenCluster`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée'))

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

module.exports = app
