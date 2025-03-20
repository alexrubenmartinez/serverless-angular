const MessageService = require('../services/messageService')

const createMessage = async (req, res) => {
  const { campaignId, phone, text, shippingStatus, processDate, processHour } = req.body

  if (!campaignId || !phone || !text || !shippingStatus || !processDate || !processHour) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const result = await MessageService.createMessage(campaignId, phone, text, shippingStatus, processDate, processHour)

  if (result.success) {
    res.status(201).json({ message: "Message created successfully", messageId: result.messageId })
  } else {
    res.status(500).json({ error: result.error })
  }
}

const listMessagesDetailsByCampaignId = async (req, res) => {
  const { id } = req.params

  try {
    const messages = await MessageService.listMessagesDetailsByCampaignId(id)
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createMessage , listMessagesDetailsByCampaignId}