const Message = require('../models/messageModel');

const createMessage = async (campaignId, phone, text) => {
  try {
    const messageId = await Message.createMessage(campaignId, phone, text);
    return { id: messageId };
  } catch (error) {
    console.error('Error creating message:', error);
    return { error: error.message };
  }
};

const listMessagesDetailsByCampaignId = async (campaignId) => {
  try {
    const messages = await Message.listMessagesDetailsByCampaignId(campaignId);
    return messages;
  } catch (error) {
    console.error('Error listing messages:', error);
    return { error: error.message };
  }
};

const createMessages = async (campaignId, phoneList, text) => {
  try {
    const messageCount = await Message.createMessages(campaignId, phoneList, text);
    return { createdMessages: messageCount };
  } catch (error) {
    console.error('Error creating messages:', error);
    return { error: error.message };
  }
};

const checkAndUpdateCampaignStatus = async (campaignId) => {
  try {
    await Message.checkAndUpdateCampaignStatus(campaignId);
    return { success: true };
  } catch (error) {
    console.error('Error checking and updating campaign status:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { createMessage, listMessagesDetailsByCampaignId, createMessages, checkAndUpdateCampaignStatus  };