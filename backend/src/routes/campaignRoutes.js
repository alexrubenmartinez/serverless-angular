// src/routes/campaignRoutes.js
const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')
const { route } = require('../app')

// Rutas para las campañas
router.post('/', campaignController.createCampaign)
router.get('/', campaignController.listCampaigns)
router.get('/all', campaignController.getAllCampaigns)
router.get('/:id/messages', campaignController.getCampaignMessages)
router.post('/create2', campaignController.createCampaign2)
router.get('/listBeetweenDates', campaignController.listCampaingsBeetweenDates)

module.exports = router
