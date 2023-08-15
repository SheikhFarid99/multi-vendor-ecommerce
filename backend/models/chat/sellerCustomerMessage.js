const { Schema, model } = require('mongoose')

const sellerCustomerSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receverId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'unseen'
    }

}, { timestamps: true })

module.exports = model('seller_customer_messages', sellerCustomerSchema)