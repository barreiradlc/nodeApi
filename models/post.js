const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    }

});

module.exports = mongoose.model("Post", postSchema);