const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const infoIntro = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        content_vi: {
            type: String,
            required: true,
        },
        content_en: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = connection.model('intro_info', infoIntro);