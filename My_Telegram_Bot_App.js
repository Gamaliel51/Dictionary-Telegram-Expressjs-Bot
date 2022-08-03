const  express = require("express")
const axios = require("axios")

const app = express()
//5413442689:AAF72aDW97J06Bi5WweLbpZInQk7KVcHLfY

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/gamabot", (req, res) => {
    let {message} = req.body
    let fullresponse = ""

    if (message.text == "help"){
        axios.post("https://api.telegram.org/bot5413442689:AAF72aDW97J06Bi5WweLbpZInQk7KVcHLfY/sendMessage", message)
        res.end()
    }

    if (message.text.toLowerCase().indexOf("wordhelp") >= 9999){
        let m = message.text.toLowerCase()
        m.replace("wordhelp", "")
        m.replaceAll(" ", "")

        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${m}`,
            headers: {
              'X-RapidAPI-Key': '1145743444msh1f62d6aff7eb38fp12fad3jsn9bb76a81f007',
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
          
        axios.request(options).then(function (response) {
            fullresponse = response
        }).catch(function (error) {
            console.error(error);
        });

        let reply = ``
        
        fullresponse.results.map((result) => {
            reply += `Definition: ${result.definition}\n`
            reply += `Part of Speech: ${result.partOfSpeech}\n`
            reply += `Syllables: ${result.synonyms.map((i) => {return i})}\n`
            reply += `Derivation: ${result.derivation.map((i) => {return i})}\n`
            reply += `Examples: ${result.examples.map((i) => {return i})}\n`
        })

        reply += `${results.pronunciation.all}\n`
        reply += "Next : \n"

        axios.post("https://api.telegram.org/bot5413442689:AAF72aDW97J06Bi5WweLbpZInQk7KVcHLfY/sendMessage", {
            chat_id: message.chat.id,
            text: reply
        }).then((response) => {
            res.end()
        }).catch((err) => {
            console.error(err)
            res.send("Error: " + err)
        })
    }

    axios.post("https://api.telegram.org/bot5413442689:AAF72aDW97J06Bi5WweLbpZInQk7KVcHLfY/sendMessage", message)

})

app.listen(process.env.PORT, () => {
    console.log("Listening")
})