const Post = require('../models/post')

exports.getPosts = (req, res) => {
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
    console.log('CREATE')
    const post = new Post(req.body)
    console.log('CREATE', post)
    // post.save((err, result) => {
    //     res.status(200).json({
    //         post: result
    //     })
    // })
    post.save().then(result => {
        res.status(200).json({
            post: result
        })
    })
}


