const express = require('express')
const router = express.Router()

router.post("/signup", (req, res) => {
    res.send("from signup page")
})

router.post("/login", (req, res) => {
    res.send("from login page")
})

module.exports = router