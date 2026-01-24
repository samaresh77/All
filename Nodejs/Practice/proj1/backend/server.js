require('./config/db')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3000
const userRoutes = require('./routes/userRoute')

app.use("/user", userRoutes)
app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.listen(port, (req, res) => {
    console.log(`Server is running at ${port}`)
})