const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    imageUri:{
        type:String
    }
})

const chatRoomSchema = new mongoose.Schema({
    uid:{
        type:String
    },
    uid2:{
        type:String
    },
    chatroomName:{
        type:String
    },
    messages:{
        type:Array
    },
    imageUri:{
        type:String
    }

})


const userCheck = mongoose.model(`users` , userSchema)
const chatRoomCheck = mongoose.model(`chatRooms` , chatRoomSchema)


module.exports = {userCheck , chatRoomCheck}