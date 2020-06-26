const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto')

// const uuidv1 = require('uuid/v1')

const UserSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required:true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    photo: {
        data: Buffer,
        contentType: String
    }
})


UserSchema.virtual('password')
    .set(function(password) {
        
        this._password = password
        
        
        this.salt = new Date().getTime()
        // this.salt = uuidv1()
        
        
        this.hashed_password = this.encryptedPassword(password)
        
    })
    .get(function() {
        return this._password
    })

UserSchema.methods = {

    authenticate: function(plainText) {
        console.log('pass')
        return this.encryptedPassword(plainText) === this.hashed_password
    },

    encryptedPassword: function(password) {
        console.log('chegou aqui')
        if(password){
            console.log('chegou aqui2')
            try{
                console.log('chegou aqui3')
                return crypto.Hmac('sha256', password)
                    .update('I love cupcakes')
                    .digest('hex')
            }
            catch(err){
                console.log('chegou aqui4', err)
                return ''
            }

        }
    }
}

module.exports = mongoose.model("User", UserSchema)