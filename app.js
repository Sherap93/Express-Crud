const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes')
const app = express();

app.use(express.json()) // this middleware for passing json data in body
app.use(route)

// connecting database
mongoose.connect('mongodb://localhost:27017/Sellers')
.then(() => {
    console.log('DB connected Successfully!!!')
})


// MVC Model, View, Controller



app.listen(3000, () => {
    console.log('your server running at http://localhost:3000')
})