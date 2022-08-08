const Flutterwave = require("flutterwave-node-v3")
require("dotenv").config()

//new flutterwave process
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY)

const getFee = async (req, res) => {
    try{
        const payload = {
            "amount": "5000",
            "currency": "NGN"
        }

        const response = await flw.Transfer.fee(payload)
        console.log(response)
        res.json(response)
    }
    catch (error){
        console.log(error)
    }
}

const cardCharge = async (req, res, card_number, cvv, expiry_month, expiry_year, email, full_name, redirect_url, amount) => {
    try{
        const payload = {
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": amount,
            "email": email,
            "fullname": full_name,
            "tx_ref": 'naf2f9sg',
            "redirect_url": redirect_url,
            "enckey": process.env.FLW_ENCRYPTION_KEY
        }

        let response = await flw.Charge.card(payload)
        console.log(response)
    }
    catch (error){
        console.error(error)
    }
}

module.exports = {getFee, cardCharge}