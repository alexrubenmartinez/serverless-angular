// src/app.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const campaignRoutes = require('./routes/campaignRoutes')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors())

// Rutas
app.use('/api/campaigns', campaignRoutes)

module.exports = app // Exportar la aplicación Express
