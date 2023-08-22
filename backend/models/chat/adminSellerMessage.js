const { Schema, model } = require('mongoose')

const adminSellerMessageSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        default: ''
    },
    receverId: {
        type: String,
        default: ''
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

module.exports = model('seller_admin_messages', adminSellerMessageSchema)