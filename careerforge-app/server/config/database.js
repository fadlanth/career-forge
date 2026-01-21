const { Sequelize } = require('sequelize');
require('dotenv').config();

// Vercel akan membaca DATABASE_URL dari environment variables yang kamu input
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Penting agar bisa konek ke Supabase
    }
  }
});

module.exports = sequelize;