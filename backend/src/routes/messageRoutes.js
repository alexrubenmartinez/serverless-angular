const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.post('/create', messageController.createMessage)
router.post('/createMessages', messageController.createMessages)
router.get('/list/:id', messageController.listMessagesDetailsByCampaignId)
router.put('/updateCampaignStatus/:campaignId', messageController.checkAndUpdateCampaignStatus);
module.exports = router
