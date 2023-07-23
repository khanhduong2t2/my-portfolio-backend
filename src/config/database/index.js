const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function newConnection() {

    const conn = mongoose.createConnection(process.env.MONGODB_URL);

    conn.on('connected', function (err) {
        console.log('Database connected');
        if (err) {
            mongoose.connection.close();
        }
    });

    conn.on('open', function (err) {
        console.log('Database open');
        if (err) {
            mongoose.connection.close();
        }
    });

    conn.on('connecting', function () {
        console.log('Database connecting');
    });

    conn.on('disconnected', function () {
        console.log('Database disconnected');
        mongoose.connection.close();
    });

    conn.on('close', function () {
        console.log('Database close');
        mongoose.connection.close();
    })

    conn.on('error', function (err) {
        console.log('connect database failure: ', err);
        mongoose.connection.close();
    });

    // Khi ta tắt server nó sẽ ngắt kết nối database
    process.on('SIGINT', async () => {
        await conn.close();
        process.exit(0);
    })

    return conn;
};

const connection = newConnection();
// connection.close();

module.exports = { connection }
