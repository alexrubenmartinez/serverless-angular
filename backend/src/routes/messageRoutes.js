const express = require('express')
const router = express.Router()
const { route } = require('../app')
const messageController = require('../controllers/messageController')

router.post('/create', messageController.createMessage)
router.get('/list/:id', messageController.listMessagesDetailsByCampaignId)

module.exports = router