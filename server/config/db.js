const mongoose = require(`mongoose`)
require(`dotenv`).config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bcznhpt.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`)

module.exports = mongoose