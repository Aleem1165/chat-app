const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    name:{
        type:String
    }
})

const userCheck = mongoose.model(`users` , userSchema)

module.exports = userCheck