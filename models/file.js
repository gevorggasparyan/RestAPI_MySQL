const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = File;
