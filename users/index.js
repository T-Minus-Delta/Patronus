const express = require('express');
require('dotenv').config();
const expressApp = require('./express-app');

const app = express();
const { PORT } = process.env;

expressApp(app);

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) })

