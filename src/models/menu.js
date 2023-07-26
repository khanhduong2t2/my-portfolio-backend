const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const menu = new mongoose.Schema(
    {
        name_vi: {
            type: String,
            required: true,
        },
        name_en: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = connection.model('menus', menu);