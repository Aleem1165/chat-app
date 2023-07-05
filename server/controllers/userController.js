const {userCheck , chatRoomCheck} = require("../scheme/userSchema");
const bcrypt = require("bcrypt");
let jwt = require(`jsonwebtoken`);



module.exports.signupUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, password , imageUri } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userCheckRes = await userCheck({
      name,
      email,
      password: hashPassword,
      imageUri
    });
    const saveRes = await userCheckRes.save();

    res.send({
      status: 200,
      message: "Signup Successfully!",
      data: saveRes,
    });
  } catch (error) {
    // console.log(error.message);
    res.send({
      status: 500,
      message: error.message,
    });
  }
};



module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userCheck.find({ email });
    if (userData.length > 0) {
      const hashedPassword = userData[0].password;
      // console.log(hashedPassword);
      const comparePasswordRes = await bcrypt.compare(password, hashedPassword);
      if (comparePasswordRes) {
        // const jwtKey = `aleem`;
        // const token = await jwt.sign({ email }, jwtKey);

        res.send({
          status: 200,
          message: "login Successfully",
          data:userData
          // data: token,
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWVtQG1haWwuY29tIiwiaWF0IjoxNjg3NTM0MzIxfQ.tHCne6epH7aTBcnMNUFFd-uJumMt4WSEd2SNjOJYfxM
        });
      } else {
        res.send({
          status: 200,
          message: "incorrect password",
        });
      }
    } else {
      res.send({
        status: 200,
        message: "user not found",
        // data:userData
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports.getUserData = async (req, res) => {
  // const { email } = req.body;
  // console.log(email);
  try {
    const dbUser = await userCheck.find();
    res.send({
      status: 200,
      message: "user found",
      data:dbUser
    });
   
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports.createChatRoom = async (req , res) => {
  const {uid , uid2 , chatroomName , messages , imageUri} = req.body
  console.log(uid , uid2 , chatroomName , messages , imageUri);
  try {
    const chatRoomRes = await chatRoomCheck({
      uid,
      uid2,
      chatroomName,
      messages,
      imageUri
    })
    const chatRoomSaveRes = await chatRoomRes.save()
    console.log(uid , uid2, chatroomName , messages);

    res.send({
      status: 200,
      message: "chatRoom save Successfully!",
      data: chatRoomSaveRes,
    });
  }catch(error){
    
    res.send({
      status: 200,
      message:error.message,
     
    });
  }
}

module.exports.adMessageInChatRoom = async (req , res) => {
  const { _id , obj } = req.body
  
  console.log(_id , obj);
  try{
    const addMessage = await chatRoomCheck.updateOne({_id} , {$push : {"messages":obj}})
    const findUpdated = await chatRoomCheck.find({_id})
     
    res.send({
      status:200,
      message:"ad Message successfully!",
      data:findUpdated
    })
  }catch(error){
    res.send({
      status:500,
      message:error.message,
    })
  }
}

module.exports.existingChatRoom = async (req , res) =>{
  const { chatroomName  } = req.body
  // console.log(chatroomName);
  try{
    const existingChat = await chatRoomCheck.find({ chatroomName })
    
    // res.send({
    //   status:500,
    //   message:"not found",
    // })
    if(existingChat.length > 0){
      res.send({
        status:200,
        message:"existingChat find",
        data:existingChat[0]
      })
    }else{
      res.send({
        status:500,
        message:"not found",
      })
    }
  }catch(error){
    res.send({
      status:500,
      message:error.message,
    })
  }

}

module.exports.getAllChatRooms = async (req , res) => {
  try{
    const allChatRooms = await chatRoomCheck.find()
    res.send({
      status:200,
      message:"getAllChatRooms",
      data:allChatRooms
    })
  }catch(error){
    res.send({
      status:200,
      message:error.message
    })
  }
}

module.exports.getSingleChatRoom = async (req , res) => {
  const { _id } = req.body
  console.log(_id);
  try{
    const singleChatRoom = await chatRoomCheck.find({_id})
    res.send({
      status:200,
      message:"getSingleChatRoom",
      data:singleChatRoom
    })
  }catch(error){
    res.send({
      status:200,
      message:error.message
    })
  }
}




