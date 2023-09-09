const { Schema, model } = require('mongoose')

const myShopWalletSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    manth: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = model('myShopWallets', myShopWalletSchema)