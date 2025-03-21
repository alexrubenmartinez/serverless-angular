const express = require('express')
const router = express.Router()
const campaignController = require('../controllers/campaignController')

router.post('/create', campaignController.createCampaign)
router.get('/listBeetweenDates', campaignController.listCampaignsBeetweenDates)
router.get('/listAll', campaignController.listAllCampaigns)
router.get('/get/:id', campaignController.getCampaignById)

module.exports = router
