const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING(100)
    },
    bio: {
        type: DataTypes.TEXT
    },
    phone: {
        type: DataTypes.STRING(20)
    },
    address: {
        type: DataTypes.TEXT
    },
    photoUrl: {
        type: DataTypes.STRING(255)
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Benar, karena 1 User = 1 Profile
        references: {       // <--- TAMBAHKAN BAGIAN INI
            model: 'users', // Harus sama persis dengan tableName di User.js
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'profiles',
    timestamps: true
});

module.exports = Profile;