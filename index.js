const express = require('express')
const app = express()

const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/', (req, res) => {
    res.send("Postou!!!")
})

app.listen(3001)