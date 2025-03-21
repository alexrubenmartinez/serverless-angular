const db = require('../utils/db')

const createCampaign = async (userId, name, processDate, processHour, phoneList, messageText) => {
  const connection = await db.getConnection()
  try {
    const [result] = await connection.query(
      'INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, name, processDate, processHour, 1, phoneList, messageText]
    )
    return result.insertId
  } catch (error) {
    console.error('Database error in createCampaign:', error)
    throw error
  } finally {
    connection.release()
  }
}

const listCampaignsBeetweenDates = async (startDate, endDate) => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM campaigns WHERE process_date BETWEEN ? AND ?', [startDate, endDate])
    return rows.map(mapToCamelCase)
  } catch (error) {
    console.error('Database error in listCampaignsBeetweenDates:', error)
    throw error
  } finally {
    connection.release()
  }
}

const listAllCampaigns = async () => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM campaigns')
    return rows.map(mapToCamelCase)
  } catch (error) {
    console.error('Database error in listAllCampaigns:', error)
    throw error
  } finally {
    connection.release()
  }
}
const getCampaignById = async (campaignId) => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query('SELECT * FROM campaigns WHERE id = ?', [campaignId])
    return rows.map(mapToCamelCase)
  } catch (error) {
    console.error('Database error in getCampaignById:', error)
    throw error
  } finally {
    connection.release()
  }
}

const mapToCamelCase = (row) => ({
  id: row.id,
  userId: row.user_id,
  name: row.name,
  processDate: row.process_date,
  processHour: row.process_hour,
  processStatus: row.process_status,
  phoneList: row.phone_list,
  messageText: row.message_text,
})

module.exports = { createCampaign, listCampaignsBeetweenDates, listAllCampaigns, getCampaignById }
