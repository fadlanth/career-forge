require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// --- 1. IMPORT SEMUA MODEL ---
// Kita panggil semua file model agar Sequelize mengenalnya
const User = require("./models/User");
const Profile = require("./models/Profile");
const Project = require("./models/Project"); // Tambahan
const Skill = require("./models/Skill"); // Tambahan
const Certificate = require("./models/Certificate"); // Tambahan

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. DEFINISI RELASI (ASSOCIATION) ---
// Kita sambungkan antar tabel di sini

// A. Relasi User - Profile (One-to-One)
User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });

// B. Relasi User - Project (One-to-Many)
// Satu user bisa punya banyak project
User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });

// C. Relasi User - Certificate (One-to-Many)
// Satu user bisa punya banyak sertifikat
User.hasMany(Certificate, { foreignKey: "userId", onDelete: "CASCADE" });
Certificate.belongsTo(User, { foreignKey: "userId" });

// D. Relasi User - Skill (Many-to-Many)
// User punya banyak skill, Skill dimiliki banyak user.
// Ini otomatis membuat tabel perantara 'user_skills'
User.belongsToMany(Skill, { through: "user_skills" });
Skill.belongsToMany(User, { through: "user_skills" });

// Route Test
app.get("/", (req, res) => {
  res.send("Backend CareerForge Berjalan Lengkap (Semua Tabel)! 🚀");
});

// --- 3. SINKRONISASI DATABASE ---
// Gunakan { alter: true } agar tabel yang kurang otomatis dibuatkan
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Semua tabel berhasil disinkronisasi:");
    console.log("   - Users, Profiles");
    console.log("   - Projects, Certificates, Skills");
    console.log("   - User_Skills (Tabel Penghubung)");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal sinkronisasi:", err);
  });

module.exports = app; // <-- WAJIB ADA
