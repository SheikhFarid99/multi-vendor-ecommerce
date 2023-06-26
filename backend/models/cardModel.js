const { Schema, model } = require('mongoose')

const cardSchema = new Schema({
    userId : {
        type : Schema.ObjectId,
        required : true
    },
    productId : {
        type : Schema.ObjectId,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
},{timestamps : true})

module.exports = model('cardProducts',cardSchema)