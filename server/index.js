const express = require("express");
const cors = require("cors")
const db = require("./config/db")
require(`dotenv`).config()



const app = express()
app.use(cors())
app.use(express.json())



db.connection
    .once(`open` , () => console.log("MongoDb is Connected"))
    .on(`error` , (err) => console.log("err====>" , err))

app.listen(process.env.PORT , function () {
    console.log(`The server is running on port ${process.env.PORT}`);
})

app.get(`/` , (req , res) => {
    res.send({
        status:200,
        message:"Server running!",
        // data:[]
    })
})

app.use(`/apis` , require(`./rootRoute`))

