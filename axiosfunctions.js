const axios = require("axios")
const {TOKEN} = require("./Variables")

async function wordhelper(word, chat_id) {
   
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    
    axios.get(url).then((response) => {
        console.log(response)
        results = response.data
        respon = results[0]
        let reply = ``
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
        
        axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
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
