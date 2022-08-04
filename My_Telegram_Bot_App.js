const  express = require("express")
const axios = require("axios")
const request = require("request")
const {wordhelper} = require("./axiosfunctions")
const {telegramsend} = require("./axiosfunctions")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/", (req, res) => {
    console.log(req.body)
    let chat_id = req.body.message.chat.id
    let text = req.body.message.text
    let fullresponse = ""

    if (text == "help"){
        axios.post("https://api.telegram.org/bot5432331669:AAELTlfBOuSvqfYxkayQ6xrvLFNWisxVdg0/sendMessage", {
            "chat_id": chat_id,
            "text": "Type wordhelp <word to check info on"
        })
        res.end()
    }

    if (text.toLowerCase().indexOf("wordhelp") >= 0){
        let m = text.toLowerCase()
        console.log(m)
        m = m.replace("wordhelp", "")
        m = m.replaceAll(" ", "")
        console.log(m)

        wordhelper(m, chat_id)
        res.end()
    }

    res.end()
})

app.listen(5000, () => {
    console.log("Listening")
})