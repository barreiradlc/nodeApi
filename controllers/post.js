const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.postById = ( req, res, next, id ) => {
  Post.findById(id) 
    .populate("postedBy", "_i name")
    .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json({
                erro: err
            })
        }
        req.post = post
        next()
    })
}


exports.getPosts = (req, res) => {
    // console.log('bateu')

    const posts = Post.find()
        .populate("postedBy", "_id name")
        .select('_id title body')
        .then( posts  => {
            res.status(200).json({ posts })
        })
        .catch(err => console.log(err))
}


exports.createPost = (req, res) => {
    // console.log('1')
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    // console.log('2')
    
    form.parse(req, (err, fields, files )=> {
        // console.log('3')
        if(err){
            res.status(400).json({
                erro: "Houve um erro inesperado"
            })
        }
        console.log(req.profile)
        let post = new Post(fields)
        post.postedBy = req.profile
        // console.log('5')
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contenType =  files.photo.type
        }
        // console.log('6')
        post.save(( err, result ) => {
            if(err){
                return res.status(400).json({
                    erro: "Houve um erro inesperado"
                })
            }
            res.json(result)
        })
    })

}

exports.postByUser = ( req, res ) => {
    Post.find({ postedBy: req.profile._id })
    .exec(( err, posts ) => {
        if(err){
            console.log('caiu aqui depois')
            return res.status(400).json({
                erro: err
            })
        }
        res.json(posts)
    })
}


exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy.id == req.auth._id

    console.log(req.post)
    console.log(req.auth)
    console.log(req.post.postedBy.id)
    console.log(req.auth._id)

    if(!isPoster){
        return res.status(403).json({
            erro: "Usuário não autorizado"
        })
    }
    next()
}

exports.updatePost = (req, res) => {
 let post = req.post    
 post = _.extend(post, req.body)
 post.updated = Date.now()
 post.save(err => {
     if(err){
         return res.status(400).json({
             erro: err
         })
     }
     res.json(post)
 })
}

exports.deletePost = ( req, res ) => {
    let post = req.post
    post.remove(( err, post ) => {
        if(err){
            return res.status(400).json({
                erro: err
            })
        }
        res.json({
            sucesso: "Post deletado com sucesso"
        })
    })
}