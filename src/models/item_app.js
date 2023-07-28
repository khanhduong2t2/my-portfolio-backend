const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const ItemApp = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        name_vi: {
            type: String,
            required: true,
        },
        name_en: {
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

module.exports = connection.model('item_apps', ItemApp);