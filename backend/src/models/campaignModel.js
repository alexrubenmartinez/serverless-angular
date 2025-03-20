// src/models/campaignModel.js
const db = require('../utils/db')

const createCampaign = async (userId, name, processDate, processHour, phoneList, messageText) => {
  // TODO: Revisar si se puede eliminar
  const connection = await db.getConnection()
  try {
    const [result] = await connection.query(
      'INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text) VALUES (?, ?, ?, ?, 0, ?, ?)',
      [userId, name, processDate, processHour, phoneList, messageText]
    )
    return result.insertId
  } finally {
    connection.release()
  }
}
const createMessages = async (campaignId, phoneList, messageText) => {
  // TODO: Revisar si se puede eliminar
  const connection = await db.getConnection()
  try {
    for (const phone of phoneList.split(',')) {
      await connection.query('INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour) VALUES (?, ?, ?, 0, CURDATE(), CURTIME())', [
        campaignId,
        phone.trim(),
        messageText,
      ])
    }
  } finally {
    connection.release()
  }
}
const listCampaignsBeetweenDates = async (startDate, endDate) => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM campaigns WHERE process_date BETWEEN ? AND ?', [startDate, endDate])
    return rows
  } finally {
    connection.release()
  }
}

class Campaign {
  static async create(campaign) {
    const [result] = await db.query('INSERT INTO campaigns (name, message, process_status) VALUES (?, ?, ?)', [campaign.name, campaign.message, campaign.process_status])
    return result.insertId
  }

  static async list(startDate, endDate) {
    const [rows] = await db.query('SELECT * FROM campaigns WHERE created_at BETWEEN ? AND ?', [startDate, endDate])
    return rows
  }

  static async getMessages(campaignId) {
    const [rows] = await db.query('SELECT * FROM messages WHERE campaign_id = ?', [campaignId])
    return rows
  }

  static async listAllCampaigns() {
    const [rows] = await db.query('SELECT * FROM campaigns')
    return rows
  }
}

module.exports = { Campaign, createCampaign, createMessages, listCampaignsBeetweenDates }
