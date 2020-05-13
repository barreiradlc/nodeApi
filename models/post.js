const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const field = 'é um campo obrigatório'

const postSchema = new Schema({
   
    title: {
        type: String,
        required: `${field} é um campo obrigatório`,
        minlength: 4,
        maxLength: 8
    },
    body: {
        type: String,
        required: "Corpo é um campo obrigatório",
        minlength: 14,
        maxLength: 28
    },
    photo: {
        type: Buffer,
        contenType: String
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    }, 
    created: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("Post", postSchema);