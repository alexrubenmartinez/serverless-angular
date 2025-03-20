const Campaign = require('../models/campaignModel');

const createCampaign = async (userId, name, processDate, processHour, phoneList, messageText) => { 
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



module.exports = { createCampaign,listCampaignsBeetweenDates};