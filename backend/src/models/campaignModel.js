const db = require('../utils/db')

const createCampaign = async (userId, name, processDate, processHour, phoneList, messageText) => {
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
const listCampaignsBeetweenDates = async (startDate, endDate) => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM campaigns WHERE process_date BETWEEN ? AND ?', [startDate, endDate])
    return rows
  } finally {
    connection.release()
  }
}


module.exports = { createCampaign, listCampaignsBeetweenDates }
