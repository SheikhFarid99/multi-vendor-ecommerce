const authorModel = require('../../models/authOrder')
const customerOrder = require('../../models/customerOrder')
const cardModel = require('../../models/cardModel')
const {
    responseReturn
} = require('../../utiles/response')
const moment = require('moment')

class orderController {

    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id)
            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, {
                    delivery_status: 'cancelled'
                })
                await authorModel.updateMany({
                    orderId: id
                }, {
                    delivery_status: "cancelled"
                })
            }
            return true
        } catch (error) {
            console.log(error)
        }
    }

    place_order = async (req, res) => {
        const {
            price,
            products,
            shipping_fee,
            shippingInfo,
            userId
        } = req.body
        let authorOrderData = []
        let cardId = []
        const tempDate = moment(Date.now()).format('LLL')

        let customerOrderProduct = []

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products
            for (let j = 0; j < pro.length; j++) {
                let tempCusPro = pro[j].productInfo
                customerOrderProduct.push(tempCusPro)
                if (pro[j]._id) {
                    cardId.push(pro[j]._id)
                }
            }
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                delivery_status: 'pending',
                payment_status: 'unpaid',
                date: tempDate
            })
            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products
                const pri = products[i].price
                const sellerId = products[i].sellerId
                let storePro = []
                for (let j = 0; j < pro.length; j++) {
                    let tempPro = pro[j].productInfo
                    tempPro.quantity = pro[j].quantity
                    storePro.push(tempPro)
                }

                authorOrderData.push({
                    orderId: order.id,
                    sellerId,
                    products: storePro,
                    price: pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Dhaka myshop Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                })
            }
            await authorModel.insertMany(authorOrderData)
            for (let k = 0; k < cardId.length; k++) {
                await cardModel.findByIdAndDelete(cardId[k])
            }
            setTimeout(() => {
                this.paymentCheck(order.id)
            }, 15000)
            responseReturn(res, 201, {
                message: "order placeed success",
                orderId: order.id
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new orderController()