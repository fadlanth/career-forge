require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// --- 1. IMPORT MODEL ---
const User = require("./models/User");
const Profile = require("./models/Profile");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Certificate = require("./models/Certificate");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. DEFINISI RELASI ---
User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Certificate, { foreignKey: "userId", onDelete: "CASCADE" });
Certificate.belongsTo(User, { foreignKey: "userId" });
User.belongsToMany(Skill, { through: "user_skills" });
Skill.belongsToMany(User, { through: "user_skills" });

// --- 3. ROUTE (Taruh di luar .then) ---
app.get("/", (req, res) => {
  res.send("Backend CareerForge Berjalan Lengkap! 🚀");
});

// Tambahkan rute rute API kamu di sini (misal: auth, projects)

// --- 4. SINKRONISASI DATABASE (Cara Serverless) ---
// Di produksi, kita tidak ingin server menunggu sync setiap kali dipanggil
if (process.env.NODE_ENV !== "production") {
  sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database Synced Local");
  });
}

// JANGAN gunakan app.listen di Vercel, biarkan module.exports yang bekerja
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app; // <-- INI YANG DILIHAT VERCEL
