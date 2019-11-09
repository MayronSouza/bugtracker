const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const GoogleSpreadsheet = require('google-spreadsheet')

const credentials = require('./bugtracker.json')

const app = express()

// Configurações
const docId = '19_VUSZ0JWgwOz9yWrpksuKWzxNcNiHnm7bFbgz1EV3o'
const worksheetIndex = 0

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/', (req, res) => {
    
    const doc = new GoogleSpreadsheet(docId)
    doc.useServiceAccountAuth(credentials, err => {
        if (err) {
            console.log('Não foi possível abrir a planilha')
        } else {
            console.log('Planilha aberta')
            doc.getInfo((err, info) => {
                const worksheet = info.worksheets[worksheetIndex]
                worksheet.addRow({
                    name: req.body.name,
                    email: req.body.email
                }, err => {
                    res.send('Bug reportado com sucesso.')
                })
            })
        }
    })
})

app.listen(3001, err => {
    if (err) {
        console.log('Ocorreu um erro.', err)
    } else {
        console.log('BugTracker rodando na porta http://localhost:3001')
    }
})