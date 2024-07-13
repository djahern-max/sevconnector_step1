// config.js
const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'Milo',
    password: process.env.DB_PASSWORD || 'Claire123!',
    database: process.env.DB_NAME || 'sevconnectorstep_1',
  },
}

module.exports = config
