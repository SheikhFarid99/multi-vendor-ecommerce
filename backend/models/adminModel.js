const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
})

module.exports = model('admins',adminSchema)