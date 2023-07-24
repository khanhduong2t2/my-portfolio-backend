const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(bodyParser.json());

// Connect DB
require('./src/config/database/index');

// Import route
const introRouter = require('./src/routes/introRouter');
const projectRouter = require('./src/routes/projectRouter');

app.use('/v1/portfolio/intro', introRouter);
app.use('/v1/portfolio/project', projectRouter);

const PORT = process.env.PORT;
app.listen(PORT, async (req, res, next) => {
    console.log('Running at: http://localhost:' + process.env.PORT);
});
