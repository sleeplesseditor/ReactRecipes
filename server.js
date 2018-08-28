const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({ path: './variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

//Connect to MLab database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => console.error(err));

//Initialize App Server
const app = express();
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});