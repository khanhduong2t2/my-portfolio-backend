const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const multer = require('multer');
dotenv.config();
const app = express();
app.use(bodyParser.json());

const upload = multer({
    storage: multer.memoryStorage(),
});
app.use(upload.any());

// Connect DB
require('./src/config/database/index');

// Import route
const appRouter = require('./src/routes/AppRouter');
const introRouter = require('./src/routes/IntroRouter');
const commonRouter = require('./src/routes/CommonRouter');

app.use('/v1/portfolio/app', appRouter);
app.use('/v1/portfolio/intro', introRouter);
app.use('/v1/portfolio/common', commonRouter);

const PORT = process.env.PORT;
app.listen(PORT, async (req, res, next) => {
    console.log('Running at: http://localhost:' + process.env.PORT);
});
