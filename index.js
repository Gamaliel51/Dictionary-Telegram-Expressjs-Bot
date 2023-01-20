const  express = require("express")
const axios = require("axios")
const request = require("request")
const {wordhelper} = require("./axiosfunctions")
const {PORT, TOKEN} = require("./Variables")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/bot", (req, res) => {
    
    let chat_id = req.body.message.chat.id
    let text = req.body.message.text

    if (text == "help"){
        axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
            "chat_id": chat_id,
            "text": `Just type in the word to search for.\n\n`
        })
        res.end()
    }

    if (text.toLowerCase() != "help"){
        let m = text.toLowerCase()
       
        wordhelper(m, chat_id)
        res.end()
    }
    else{
        axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
            "chat_id": chat_id,
            "text": `Just type in the word to search for\n\n Type help to bring up this message again.`
        })
        res.end()
    }
    res.end()
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
