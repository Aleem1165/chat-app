const express = require("express");
const cors = require("cors");
const db = require("./config/db");
require(`dotenv`).config();
const socket = require("socket.io");
const { userCheck , chatRoomCheck } = require("./scheme/userSchema");

const app = express();
app.use(cors());
app.use(express.json());

db.connection
  .once(`open`, () => console.log("MongoDb is Connected"))
  .on(`error`, (err) => console.log("err====>", err));

const server = app.listen(process.env.PORT, function () {
  console.log(`The server is running on port ${process.env.PORT}`);
});

app.get(`/`, (req, res) => {
  res.send({
    status: 200,
    message: "Server running!",
  });
});

app.use(`/apis`, require(`./rootRoute`));

const io = socket(server);

io.on(`connection`, (socket) => {
  const changeStream = userCheck.watch();
  changeStream.on("change", async (next) => {
    
    switch (next.operationType) {
      case "insert":
        // console.log("an insert happened...", "uni_ID: ", next.fullDocument);
        socket.emit(`message` , next.fullDocument)
        break;
    }
  });

  const chatToomChangeStream = chatRoomCheck.watch();
  chatToomChangeStream.on("change", async (next) => {
    console.log(next);
    const _id = next.documentKey._id
    switch (next.operationType) {
      case "update":
        socket.emit(`msg` , {
          msg:next.updateDescription.updatedFields,
          _id
        }
         )
        break;
      case "insert":
    const existingChat = await chatRoomCheck.find()
    console.log("existingChat===>" , existingChat);
    socket.emit(`existingChat` , existingChat)
    }
  });
  console.log("user connected!");
  console.log(socket.id);

  socket.on(`disconnect`, () => {
    console.log("user Disconnect");
  });

});
