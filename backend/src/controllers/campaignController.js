// src/controllers/campaignController.js
const CampaignService = require('../services/campaignService');

const createCampaign2 = async (req, res) => { 
  const { userId, name, processDate, processHour, phoneList, messageText } = req.body;

  if (!userId || !name || !processDate || !processHour || !phoneList || !messageText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await CampaignService.createCampaignWithMessages(userId, name, processDate, processHour, phoneList, messageText);

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

const createCampaign = async (req, res) => {
  const { name, message } = req.body;
  const campaign = { name, message, process_status: 1 }; // 1: pendiente

  try {
    const result = await CampaignService.createCampaign(campaign);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listCampaigns = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const campaigns = await CampaignService.listCampaigns(startDate, endDate);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCampaignMessages = async (req, res) => {
  const { id } = req.params;

  try {
    const messages = await CampaignService.getCampaignMessages(id);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignService.listAllCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCampaign,
  listCampaigns,
  getCampaignMessages,
  getAllCampaigns,
  createCampaign2,
  listCampaingsBeetweenDates
};