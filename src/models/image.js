const mongoose = require('mongoose');
const { connection } = require('../config/database/index');

const image = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
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

module.exports = connection.model('images', image);