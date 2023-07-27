const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const content = new mongoose.Schema(
    {
        content_vi: {
            type: String,
            required: true,
        },
        content_en: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = connection.model('contents', content);