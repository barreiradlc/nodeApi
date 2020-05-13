const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

dotenv.config()

const userRoute = require('./routes/user')
const postsRoute = require('./routes/post')
const authRoute = require('./routes/auth')

app.get('/', function (req, res) {
    return res.send(JSON.stringify({ Hello: "World"}))
});

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


const myOwnMiddleware = ( req, res, next ) => {
    console.log('middlaware')
    // next()
}

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(morgan(myOwnMiddleware))

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
} )