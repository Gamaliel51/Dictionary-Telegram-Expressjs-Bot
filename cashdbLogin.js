const mongoose  = require("mongoose")
const passportlocalmongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/cashUsersDb", () => {
    console.log("Successfully connected to the database")
})

cashUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    id: Number
})

cashUserSchema.plugin(passportlocalmongoose)

cashUsers = mongoose.model("cashUsers", cashUserSchema, "cashUsers")

//cashUsers.register({ username: 'miracle', active: false }, 'gama123')
//cashUsers.register({ username: 'add', active: false }, '123')

module.exports = cashUsers
