require('dotenv').config()

const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Milo',
    password: process.env.DB_PASSWORD || 'Thelast1!',
    database: process.env.DB_NAME || 'SevConnector',
  },
}

module.exports = config
