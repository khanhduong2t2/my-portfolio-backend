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
        img_intro: {
            type: String,
            required: true,
        },
        number_star: {
            type: Number,
            required: false,
        },
        arr_language: {
            type: Array,
            required: false,
        },
        arr_link: {
            type: Array,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = connection.model('item_apps', ItemApp);