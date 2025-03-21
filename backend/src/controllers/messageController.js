const MessageService = require('../services/messageService')

const createMessage = async (req, res) => {
  const { campaignId, phone, text } = req.body

  if (!campaignId || !phone || !text) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const result = await MessageService.createMessage(campaignId, phone, text)

  if (result.id) {
    res.status(201).json({ message: 'Message created successfully', messageId: result.id })
  } else {
    res.status(500).json({ error: result.error })
  }
}

const listMessagesDetailsByCampaignId = async (req, res) => {
  const { id } = req.params

  try {
    const result = await MessageService.listMessagesDetailsByCampaignId(id);
    if(result.error){
      return res.status(500).json(result)
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createMessages = async (req, res) => {
  const { campaignId, phoneList, text } = req.body

  if (!campaignId || !phoneList || !text) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const result = await MessageService.createMessages(campaignId, phoneList, text)

  if (result.createdMessages >= 0) {
    res.status(201).json({ message: 'Messages created successfully', createdMessages: result.createdMessages })
  } else {
    res.status(500).json({ error: result.error })
  }
}
const checkAndUpdateCampaignStatus = async (req, res) => {
  const { campaignId } = req.params

  try {
    const result = await MessageService.checkAndUpdateCampaignStatus(campaignId)
    res.status(200).json({ message: 'Campaign status updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createMessage, listMessagesDetailsByCampaignId, createMessages, checkAndUpdateCampaignStatus }
