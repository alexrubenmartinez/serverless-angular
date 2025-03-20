// src/services/campaignService.js
const Campaign = require('../models/campaignModel');

const createCampaignWithMessages = async (userId, name, processDate, processHour, phoneList, messageText) => { // TODO: Revisar si se puede eliminar
  try {
    const campaignId = await Campaign.createCampaign(userId, name, processDate, processHour, phoneList, messageText);
    await Campaign.createMessages(campaignId, phoneList, messageText);
    return { success: true, campaignId };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { success: false, error: error.message };
  }
}

const listCampaignsBeetweenDates = async (startDate, endDate) => {
  try {
    const campaigns = await Campaign.listCampaignsBeetweenDates(startDate, endDate);
    return campaigns;
  } catch (error) {
    console.error("Error listing campaigns:", error);
    return { error: error.message };
  }
}

class CampaignService {
  static async createCampaign(campaignData) {
    const campaignId = await Campaign.create(campaignData);
    return { id: campaignId, ...campaignData };
  }

  static async listCampaigns(startDate, endDate) {
    return await Campaign.list(startDate, endDate);
  }

  static async getCampaignMessages(campaignId) {
    return await Campaign.getMessages(campaignId);
  }

  static async listAllCampaigns() {
    return await Campaign.listAllCampaigns();
  }
}

module.exports = {CampaignService, createCampaignWithMessages,listCampaignsBeetweenDates};