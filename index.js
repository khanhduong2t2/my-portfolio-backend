const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const upload = multer({
    storage: multer.memoryStorage(),
});
app.use(upload.any());

// Connect DB
require('./src/config/database/index');

// Import route
const appRouter = require('./src/routes/AppRouter');
const webRouter = require('./src/routes/WebRouter');
const introRouter = require('./src/routes/IntroRouter');
const commonRouter = require('./src/routes/CommonRouter');

app.use('/v1/portfolio/app', appRouter);
app.use('/v1/portfolio/website', webRouter);
app.use('/v1/portfolio/intro', introRouter);
app.use('/v1/portfolio/common', commonRouter);

app.get('/', (req, res) => {
    res.send('SERVER ON');
});

const PORT = process.env.PORT;
app.listen(PORT, async (req, res, next) => {
    console.log('Server running at: http://localhost:' + process.env.PORT);
});
