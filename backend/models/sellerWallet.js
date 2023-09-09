const { Schema, model } = require('mongoose')

const sellerWalletSchema = new Schema({
    sellerId: {
        type: String,
        required: true
    },
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


module.exports = model('sellerWallets', sellerWalletSchema)