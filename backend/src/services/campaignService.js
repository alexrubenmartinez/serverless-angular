const Campaign = require('../models/campaignModel')

const createCampaign = async (userId, name, processDate, processHour, phoneList, messageText) => {
  try {
    const campaignId = await Campaign.createCampaign(userId, name, processDate, processHour, phoneList, messageText)
    return { success: true, campaignId }
  } catch (error) {
    console.error('Error creating campaign:', error)
    return { success: false, error: error.message }
  }
}

const listCampaignsBeetweenDates = async (startDate, endDate) => {
  try {
    const campaigns = await Campaign.listCampaignsBeetweenDates(startDate, endDate)
    return campaigns
  } catch (error) {
    console.error('Error listing campaigns:', error)
    return { error: error.message }
  }
}

const listAllCampaigns = async () => {
  try {
    const campaigns = await Campaign.listAllCampaigns()
    return campaigns
  } catch (error) {
    console.error('Error listing campaigns:', error)
    return { error: error.message }
  }
}

const getCampaignById = async (campaignId) => {
  try {
    const campaign = await Campaign.getCampaignById(campaignId)
    return campaign
  } catch (error) {
    console.error('Error getting campaign by id:', error)
    return { error: error.message }
  }
}

module.exports = { createCampaign, listCampaignsBeetweenDates, listAllCampaigns, getCampaignById }
