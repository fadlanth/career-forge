const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING(50) // Contoh: 'Hard Skill', 'Soft Skill'
    }
}, {
    tableName: 'skills',
    timestamps: false
});

module.exports = Skill;