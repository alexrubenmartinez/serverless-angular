const Message = require('../models/messageModel')

const createMessage = async (campaignId, phone, text, shippingStatus, processDate, processHour) => {
  try {
    const messageId = await Message.createMessage(campaignId, phone, text, shippingStatus, processDate, processHour)
    return { id: messageId }
  } catch (error) {
    console.error("Error creating message:", error)
    return { error: error.message }
  }
}

const listMessagesDetailsByCampaignId = async (campaignId) => {
  try {
    const messages = await Message.listMessagesDetailsByCampaignId(campaignId)
    return messages
  } catch (error) {
    console.error("Error listing messages:", error)
    return { error: error.message }
  }
}

module.exports = { createMessage , listMessagesDetailsByCampaignId}
