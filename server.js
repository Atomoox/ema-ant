const express = require('express')
const path = require('path');

const app = express()
const port = 8080

app.use('/js/', express.static(path.join(__dirname, '/src')))

app.use('/assets/', express.static(path.join(__dirname, '/public/assets')))
app.use('/styles/', express.static(path.join(__dirname, '/public/styles')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})