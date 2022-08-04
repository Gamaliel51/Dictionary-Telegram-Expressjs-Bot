const  express = require("express")
const axios = require("axios")
const request = require("request")
const {wordhelper} = require("./axiosfunctions")
const {telegramsend} = require("./axiosfunctions")

const app = express()
//5413442689:AAF72aDW97J06Bi5WweLbpZInQk7KVcHLfY

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/gamabot", (req, res) => {
    console.log(req.body)
    let chat_id = req.body.message.chat.id
    let text = req.body.message.text
    let fullresponse = ""

    if (text == "help"){
        axios.post("https://api.telegram.org/bot5582410539:AAE2EXxLlZc3GJj5HaqUtyScnPGUcqCoXvU/sendMessage", {
            "chat_id": chat_id,
            "text": "Type wordhelp <word to check info on"
        })
    }

    if (text.toLowerCase().indexOf("wordhelp") >= 0){
        let m = text.toLowerCase()
        console.log(m)
        m.replace("wordhelp", "")
        m.replaceAll(" ", "")

        fullresponse = wordhelper(m)

        let reply = ``
        console.log(fullresponse)
        
        fullresponse.results.map((result) => {
            reply += `Definition: ${result.definition}\n`
            reply += `Part of Speech: ${result.partOfSpeech}\n`
            reply += `Syllables: ${result.synonyms.map((i) => {return i})}\n`
            reply += `Derivation: ${result.derivation.map((i) => {return i})}\n`
            reply += `Examples: ${result.examples.map((i) => {return i})}\n`
        })

        reply += `${results.pronunciation.all}\n`
        reply += "Next : \n"

        telegramsend(reply)
        
    }

})

app.listen(5000, () => {
    console.log("Listening")
})