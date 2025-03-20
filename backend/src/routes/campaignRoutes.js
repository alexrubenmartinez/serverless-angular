const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')

// Rutas para las campañas
router.post('/create', campaignController.createCampaign)
router.get('/listBeetweenDates', campaignController.listCampaingsBeetweenDates)

module.exports = router
