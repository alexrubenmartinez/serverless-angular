const CampaignService = require('../services/campaignService');

const createCampaign = async (req, res) => { 
  const { userId, name, processDate, processHour, phoneList, messageText } = req.body;

  if (!userId || !name || !processDate || !processHour || !phoneList || !messageText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await CampaignService.createCampaign(userId, name, processDate, processHour, phoneList, messageText);

  if (result.success) {
    res.status(201).json({ message: "Campaign created successfully", campaignId: result.campaignId });
  } else {
    res.status(500).json({ error: result.error });
  }
};

const listCampaingsBeetweenDates = async (req, res) => { 
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Both startDate and endDate are required" });
  }

  try {
    const campaigns = await CampaignService.listCampaignsBeetweenDates(startDate, endDate);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCampaign,
  listCampaingsBeetweenDates,

};