const db = require('../utils/db')

const createMessage = async (campaignId, phone, text, shippingStatus, processDate, processHour) => {
  const connection = await db.getConnection()
  try {
    const [result] = await connection.query('INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour) VALUES (?, ?, ?, 0, CURDATE(), CURTIME())', [
      campaignId,
      phone.trim(),
      text,
      shippingStatus,
      processDate,
      processHour
    ])
    return result.insertId
  } finally {
    connection.release()
  }
}
const listMessagesDetailsByCampaignId = async (campaignId) => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM messages WHERE campaign_id = ?', [campaignId])
    return rows
  } finally {
    connection.release()
  }
}

module.exports = { createMessage, listMessagesDetailsByCampaignId }