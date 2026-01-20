import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
const app = express()
dotenv.config()
const port = process.env.PORT || 3000;

connectDB()

app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})