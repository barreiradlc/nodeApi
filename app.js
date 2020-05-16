const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const fs = require('fs')

dotenv.config()

const userRoute = require('./routes/user')
const postsRoute = require('./routes/post')
const authRoute = require('./routes/auth')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

.then((
    console.log('-- DB connectado --')
    ))
    
    mongoose.connection.on('error', err => {
        console.log('ERRO ao conectar', err.message)
    })
    
// app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(expressValidator())
// app.use(morgan(myOwnMiddleware))

app.use('/', (req, res) => {
    fs.readFile('docs/apiDoc.json', (err, data) => {
        console.log('alou 1')
        if(err){
            return res.status(400).json({
                erro: err
            })
        }
        console.log('alou 2')
        res.json(JSON.parse(data))
        console.log('alou 3')
    })
})

app.use('/', postsRoute)
app.use('/', authRoute)
app.use('/', userRoute)


app.use(function (err, req, res, next) {
    if(err.name === "UnauthorizedError") {
        res.status(401).json(({erro: 'token inváilido  ou inexistente'}))
    }
})

const port = ('8080')


app.listen(port, () => {
    console.log('alou')
})