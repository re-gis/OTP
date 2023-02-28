const bodyParser = require('body-parser')
const express = require('express')
const app = express()
require('dotenv').config()
const { connectDB } = require('./config/db')
const router = require('./Routers/user.routes')
const lodash = require('lodash')

// Database stuff
connectDB()

// Bodyparser stuff
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/otp/api', router)

app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server listening port ${process.env.PORT}`);
})