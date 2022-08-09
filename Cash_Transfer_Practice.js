const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cashUsers = require("./cashdbLogin")
const sessions = require("express-session")
const path = require("path")
const dot = require("dotenv")
dot.config()


app = express()
timeout = 1000*60*5

app.use(express.static("./public"))
app.use(sessions({
    secret: 'Thisisarandomkey',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: timeout}
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(cashUsers.createStrategy())

passport.serializeUser(cashUsers.serializeUser())
passport.deserializeUser(cashUsers.deserializeUser())

app.get('/', (req, res) => {
    way = path.join(__dirname, "public", "paytest.html")
    res.sendFile(way)
});

app.get("/checkfee", (req, res) => {
    getFee(req, res)
    
})

app.post("/", passport.authenticate('local', {failureRedirect: "/"}), (req, res) => {
    res.send("hello")
    res.end()
})

app.post("/transfer",  (req, res) => {
    res.end()
})

app.listen(5000, () => {
    console.log("listening on port 5000")
})
