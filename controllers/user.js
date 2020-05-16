const _ = require('lodash')
const User = require('../models/user')

exports.userById = (req, res, next, id) => {

    console.debug({id})

    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Usuário não encontrado"
            })
        }
        req.profile = user
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && res.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({
            erro: "Usuário não autorizado"
        })
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err){
            return res.status(400).json({
                erro: err
            })
        }
        res.json({users})
    }).select('name email _id')


}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}



exports.updateUser = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                erro: 'Não é autorizado a fazer isso'
            })
        }
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        res.json({user})
    })
}

exports.deleteUser = ( req, res, next ) => {
    let user = req.profile
    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                erro: err
            })
        }
        res.json({
            "Sucesso": "Usuário deletado com sucesso"
        })
    })
}