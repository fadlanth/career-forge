const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;

// Cek apakah URL ada sebelum diproses oleh Sequelize
if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined! Check Vercel Environment Variables.");
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Wajib untuk Supabase di Vercel
    }
  },
  logging: false 
});

module.exports = sequelize;