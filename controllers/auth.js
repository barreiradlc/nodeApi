const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

exports.signup = async ( req, res ) => {
    
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email já cadastrado"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message: "Cadastro bem sucedido, por favor faça seu login"})
}

exports.signin = ( req, res, next) => {
    const {email, password } = req.body
    User.findOne({email}, (err, user) => {
        
        if(err || !user){
            return res.status(401).json({
                error: "Usuário não cadastrado"
            })
        }
        
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Usuário ou senha incorretos"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT)

        res.cookie('t', token, {expire: new Date() + 9000})

        const {_id, name, email} = user

        return res.json({token, user: {_id, email, name}})

    })
    // const user = User.find(req.email)     
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    return  res.json({message: "Usuário delogado com sucesso"})
}
