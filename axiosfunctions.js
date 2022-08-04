const axios = require("axios")
const {TOKEN} = require("./Variables")

async function wordhelper(word, chat_id) {
    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        headers: {
          'X-RapidAPI-Key': '1145743444msh1f62d6aff7eb38fp12fad3jsn9bb76a81f007',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    let config = {
        
    }

    let result = ""

    axios.get(url).then((response) => {
        results = response.data
        console.log("results: ")
        console.log(results)

        respon = results[0]

        let reply = ``
        console.log("meanings: ")
        console.log(respon.meanings)
        
        let count = 1
        respon.meanings.forEach((result) => {
            reply += `Word ${count}\n`
            reply += `Part Of Speech: ${result.partOfSpeech}\n`
            result.definitions.forEach((defs) => {
                reply += `Definition: ${defs.definition}\n`
                if (defs.example){
                    reply += `Example: ${defs.example}\n`
                }
                defs.synonyms.forEach((s) => {
                    reply += `Synonyms: ${s}, `
                })
                reply += `\n`
                defs.antonyms.forEach((a) => {
                    reply += `Antonyms: ${a}, `
                })
                reply += `\n`
            })
            reply += '\n\n'
            count += 1
        })

        console.log("reply: ")
        console.log(reply)
        
        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                "chat_id": chat_id,
                "text": reply
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.error(err)
            })
    }).catch((err) => {
        console.error(err)
    })
    
}

module.exports = {wordhelper}