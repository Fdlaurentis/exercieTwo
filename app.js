const express = require('express')

const app = express()

app.use(express.json())


app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`
    })
})

module.exports = { app }