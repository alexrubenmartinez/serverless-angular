// src/utils/db.js
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'campaign_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
