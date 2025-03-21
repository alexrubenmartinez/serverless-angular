const db = require('../utils/db');

const createMessages = async (campaignId, phoneList, text) => {
  const connection = await db.getConnection();
  try {
    const phones = phoneList
      .split(',')
      .map((phone) => phone.trim())
      .filter((phone) => phone);

    if (phones.length === 0) {
      throw new Error('No valid phone numbers provided.');
    }

    const values = phones.map((phone) => [campaignId, phone, text, 1]);

    const [result] = await connection.query(
      'INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour) VALUES ' +
        values.map(() => '(?, ?, ?, ?, CURDATE(), CURTIME())').join(', '),
      values.flat()
    );
    await updateCampaignStatus(campaignId, 2, connection);
    return result.affectedRows; 
  } catch (error) {
    console.error('Database error in createMessages:', error);
    throw error; 
  } finally {
    connection.release();
  }
};
const updateCampaignStatus = async (campaignId, status, connection) => {
  await connection.query('UPDATE campaigns SET process_status = ? WHERE id = ?', [status, campaignId]);
};

const checkAndUpdateCampaignStatus = async (campaignId) => {
  const connection = await db.getConnection();
  try {
    const [messages] = await connection.query('SELECT shipping_status FROM messages WHERE campaign_id = ?', [campaignId]);
    const allFinished = messages.every(message => message.shipping_status === 2 || message.shipping_status === 3);

    if (allFinished) {
      await updateCampaignStatus(campaignId, 3, connection);
    }
  } catch (error) {
    console.error('Database error in checkAndUpdateCampaignStatus:', error);
    throw error;
  } finally {
    connection.release();
  }
};

const createMessage = async (campaignId, phone, text) => {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour) VALUES (?, ?, ?, 0, CURDATE(), CURTIME())',
      [campaignId, phone.trim(), text]
    );
    return result.insertId;
  } catch (error) {
    console.error('Database error in createMessage:', error);
    throw error;
  } finally {
    connection.release();
  }
};

const listMessagesDetailsByCampaignId = async (campaignId) => {
  const connection = await db.getConnection();
  try {
    // Obtener los mensajes
    const [messages] = await connection.query('SELECT * FROM messages WHERE campaign_id = ?', [campaignId]);
    const camelCaseMessages = messages.map(mapToCamelCaseMessage);

    // Obtener los detalles de la campaña
    const [campaignDetails] = await connection.query('SELECT * FROM campaigns WHERE id = ?', [campaignId]);
    const camelCaseCampaignDetails = campaignDetails.map(mapToCamelCaseCampaign);

    // Combinar los resultados
    return {
      campaignDetails: camelCaseCampaignDetails.length > 0 ? camelCaseCampaignDetails[0] : null,
      messages: camelCaseMessages,
    };
  } catch (error) {
    console.error('Database error in listMessagesDetailsByCampaignId:', error);
    throw error;
  } finally {
    connection.release();
  }
};

const mapToCamelCaseMessage = (row) => ({
  id: row.id,
  campaignId: row.campaign_id,
  phone: row.phone,
  text: row.text,
  shippingStatus: row.shipping_status,
  processDate: row.process_date,
  processHour: row.process_hour,
});

const mapToCamelCaseCampaign = (row) => ({
  id: row.id,
  userId: row.user_id,
  name: row.name,
  processDate: row.process_date,
  processHour: row.process_hour,
  processStatus: row.process_status,
  phoneList: row.phone_list,
  messageText: row.message_text,
});


module.exports = { createMessage, listMessagesDetailsByCampaignId, createMessages, checkAndUpdateCampaignStatus };