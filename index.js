const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Connect DB
require('./src/config/database/index');

// Import route
const projectRouter = require('./src/routes/projectRouter');

app.use('/v1/portfolio/project', projectRouter);

const PORT = process.env.PORT;
app.listen(PORT, async (req, res, next) => {
    console.log('Running at: http://localhost:' + process.env.PORT);
});
