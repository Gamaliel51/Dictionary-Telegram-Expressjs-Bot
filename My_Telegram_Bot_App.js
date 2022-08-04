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

app.post("/", (req, res) => {
    
    let chat_id = req.body.message.chat.id
    let text = req.body.message.text

    if (text == "help"){
        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            "chat_id": chat_id,
            "text": "Type wordhelp <word to check info on"
        })
        res.end()
    }

    if (text.toLowerCase().indexOf("wordhelp") >= 0){
        let m = text.toLowerCase()
        
        m = m.replace("wordhelp", "")
        m = m.replaceAll(" ", "")

        wordhelper(m, chat_id)
        res.end()
    }
    else{
        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            "chat_id": chat_id,
            "text": `Type wordhelp <word to check info on\n Type help for help`
        })
        res.end()
    }
    res.end()
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})