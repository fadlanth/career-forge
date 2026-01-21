const sequelize = require("../config/database");
const User = require("./User");
const Profile = require("./Profile");
const Project = require("./Project");
const Certificate = require("./Certificate");
const Skill = require("./Skill");

// 1. User <-> Profile (One-to-One)
User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });

// 2. User <-> Project (One-to-Many)
User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });

// 3. User <-> Certificate (One-to-Many)
User.hasMany(Certificate, { foreignKey: "userId", onDelete: "CASCADE" });
Certificate.belongsTo(User, { foreignKey: "userId" });

// 4. User <-> Skill (Many-to-Many via user_skills)
// Ini akan menggunakan tabel 'user_skills' yang sudah ada di phpMyAdmin Anda
User.belongsToMany(Skill, { through: "user_skills", foreignKey: "userId", otherKey: "skillId" });
Skill.belongsToMany(User, { through: "user_skills", foreignKey: "skillId", otherKey: "userId" });

const db = {
  sequelize,
  User,
  Profile,
  Project,
  Certificate,
  Skill,
};

// ... semua import dan middleware ...

// app.listen(5000, () => ... );  <-- JANGAN PAKAI INI UNTUK VERCEL

// Ganti dengan ini:
app.get("/", (req, res) => {
  res.send("CareerForge API is Running!");
});

module.exports = app; // <-- WAJIB ADA
