const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')


exports.getPosts = (req, res) => {
    console.log('bateu')
    // res.json({
    //     posts: [
    //         {title: 'Jao'},
    //         {title: 'Maria'},
    //         {title: 'Julio'},
    //         {title: 'Anselmo'},
    //         {title: 'Merilu'},
    //     ]
    //  })
    const posts = Post.find()
        .select('_id title body')
        .then( posts  => {
            res.status(200).json({ posts : posts})
        })
        .catch(err => console.log(err))
}


exports.createPost = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, fields, files, () => {
        if(err){
            res.status(400).json({
                erro: "Houve um erro inesperado"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contenType =  files.photo.type
        }
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


