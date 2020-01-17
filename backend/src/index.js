const express = require('express')
const cors = require('cors')
const router = require('./router')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})


app.listen(PORT, () => {
    console.log(`Server has started at port: ${PORT}`)
})