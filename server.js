require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const edge = require('edge.js');

// Static Files (Public)
app.use(express.static('./public'))

// Template Engine
edge.registerViews(path.join(__dirname, './resources/views'))

// Router
app.use('/', require('./routes/routes.js'));

// Listen
app.listen(process.env.PORT, () => {
    // Message
    console.log(`Listening on PORT: ${process.env.PORT}`);
});