async function wordhelper(word) {
    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        headers: {
          'X-RapidAPI-Key': '1145743444msh1f62d6aff7eb38fp12fad3jsn9bb76a81f007',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
      
    result = await axios.request(options)
    respon = await result.json()
    return respon
}

async function telegramsend(reply) {
    axios.post("https://api.telegram.org/bot5582410539:AAE2EXxLlZc3GJj5HaqUtyScnPGUcqCoXvU/sendMessage", {
            "chat_id": chat_id,
            "text": reply
        }).then((response) => {
            console.log(response.json())
        }).catch((err) => {
            console.error(err)
            res.send("Error: " + err)
        })
}

module.exports = {wordhelper, telegramsend}