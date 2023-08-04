const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const DetailWeb = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        img_intro: {
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
            type: Array,
            required: true,
        },
        content_en: {
            type: Array,
            required: true,
        },
        arr_feature: {
            type: Array,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = connection.model('detail_webs', DetailWeb);