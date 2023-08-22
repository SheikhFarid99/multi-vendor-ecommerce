const sellerModel = require('../../models/sellerModel')
const customerModel = require('../../models/customerModel')
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel')
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage')
const adminSellerMessage = require('../../models/chat/adminSellerMessage')
const { responseReturn } = require('../../utiles/response')


class chatController {
    add_customer_friend = async (req, res) => {
        const {
            sellerId,
            userId
        } = req.body;
        //console.log(req.body)
        try {
            if (sellerId !== '') {
                const seller = await sellerModel.findById(sellerId)
                const user = await customerModel.findById(userId)
                const checkSeller = await sellerCustomerModel.findOne({
                    $and: [{
                        myId: {
                            $eq: userId
                        }
                    }, {
                        myFriends: {
                            $elemMatch: {
                                fdId: sellerId
                            }
                        }
                    }]
                })
                if (!checkSeller) {
                    await sellerCustomerModel.updateOne({
                        myId: userId
                    }, {
                        $push: {
                            myFriends: {
                                fdId: sellerId,
                                name: seller.shopInfo?.shopName,
                                image: seller.image
                            }
                        }
                    })
                }

                const checkCustomer = await sellerCustomerModel.findOne({
                    $and: [{
                        myId: {
                            $eq: sellerId
                        }
                    }, {
                        myFriends: {
                            $elemMatch: {
                                fdId: userId
                            }
                        }
                    }]
                })
                if (!checkCustomer) {
                    await sellerCustomerModel.updateOne({
                        myId: sellerId
                    }, {
                        $push: {
                            myFriends: {
                                fdId: userId,
                                name: user.name,
                                image: ""
                            }
                        }
                    })
                }
                const messages = await sellerCustomerMessage.find({
                    $or: [
                        {
                            $and: [{
                                receverId: { $eq: sellerId }
                            }, {
                                senderId: {
                                    $eq: userId
                                }
                            }]
                        },
                        {
                            $and: [{
                                receverId: { $eq: userId }
                            }, {
                                senderId: {
                                    $eq: sellerId
                                }
                            }]
                        }
                    ]
                })
                const MyFriends = await sellerCustomerModel.findOne({
                    myId: userId
                })
                const currentFd = MyFriends.myFriends.find(s => s.fdId === sellerId)
                responseReturn(res, 200, {
                    myFriends: MyFriends.myFriends,
                    currentFd,
                    messages
                })
            } else {
                const MyFriends = await sellerCustomerModel.findOne({
                    myId: userId
                })
                responseReturn(res, 200, {
                    myFriends: MyFriends.myFriends
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    customer_message_add = async (req, res) => {
        const { userId, text, sellerId, name } = req.body
        try {
            const message = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receverId: sellerId,
                message: text
            })

            const data = await sellerCustomerModel.findOne({ myId: userId })
            let myFriends = data.myFriends
            let index = myFriends.findIndex(f => f.fdId === sellerId)
            while (index > 0) {
                let temp = myFriends[index]
                myFriends[index] = myFriends[index - 1]
                myFriends[index - 1] = temp
                index--
            }
            await sellerCustomerModel.updateOne(
                {
                    myId: userId
                },
                {
                    myFriends
                }
            )
            const data1 = await sellerCustomerModel.findOne({ myId: sellerId })
            let myFriends1 = data1.myFriends
            let index1 = myFriends1.findIndex(f => f.fdId === userId)

            while (index1 > 0) {
                let temp1 = myFriends1[index1]
                myFriends1[index1] = myFriends[index1 - 1]
                myFriends1[index1 - 1] = temp1
                index1--
            }

            await sellerCustomerModel.updateOne(
                {
                    myId: sellerId
                },
                {
                    myFriends1
                }
            )

            responseReturn(res, 201, { message })

        } catch (error) {
            console.log(error)
        }
    }

    get_customers = async (req, res) => {
        const { sellerId } = req.params

        try {
            const data = await sellerCustomerModel.findOne({ myId: sellerId })

            responseReturn(res, 200, {
                customers: data.myFriends
            })
        } catch (error) {
            console.log(error)
        }
    }

    get_customer_seller_message = async (req, res) => {
        const { customerId } = req.params
        const { id } = req

        try {
            const messages = await sellerCustomerMessage.find({
                $or: [
                    {
                        $and: [{
                            receverId: { $eq: customerId }
                        }, {
                            senderId: {
                                $eq: id
                            }
                        }]
                    },
                    {
                        $and: [{
                            receverId: { $eq: id }
                        }, {
                            senderId: {
                                $eq: customerId
                            }
                        }]
                    }
                ]
            })
            const currentCustomer = await customerModel.findById(customerId)


            responseReturn(res, 200, { messages, currentCustomer })


        } catch (error) {
            console.log(error)
        }

    }

    seller_message_add = async (req, res) => {
        const { senderId, text, receverId, name } = req.body
        try {
            const message = await sellerCustomerMessage.create({
                senderId: senderId,
                senderName: name,
                receverId: receverId,
                message: text
            })

            const data = await sellerCustomerModel.findOne({ myId: senderId })
            let myFriends = data.myFriends
            let index = myFriends.findIndex(f => f.fdId === receverId)
            while (index > 0) {
                let temp = myFriends[index]
                myFriends[index] = myFriends[index - 1]
                myFriends[index - 1] = temp
                index--
            }
            await sellerCustomerModel.updateOne(
                {
                    myId: senderId
                },
                {
                    myFriends
                }
            )
            const data1 = await sellerCustomerModel.findOne({ myId: receverId })
            let myFriends1 = data1.myFriends
            let index1 = myFriends1.findIndex(f => f.fdId === senderId)

            while (index1 > 0) {
                let temp1 = myFriends1[index1]
                myFriends1[index1] = myFriends[index1 - 1]
                myFriends1[index1 - 1] = temp1
                index1--
            }

            await sellerCustomerModel.updateOne(
                {
                    myId: receverId
                },
                {
                    myFriends1
                }
            )

            responseReturn(res, 201, { message })

        } catch (error) {
            console.log(error)
        }
    }

    get_sellers = async (req, res) => {
        try {
            const sellers = await sellerModel.find({})
            responseReturn(res, 200, { sellers })
        } catch (error) {
            console.log(error)
        }
    }

    seller_admin_message_insert = async (req, res) => {
        const { senderId, receverId, message, senderName } = req.body
        try {
            const messageData = await adminSellerMessage.create({
                senderId,
                receverId,
                senderName,
                message
            })
            responseReturn(res, 200, { message: messageData })
        } catch (error) {
            console.log(error)
        }
    }

    get_admin_messages = async (req, res) => {

        const { receverId } = req.params;
        const id = ""
        try {
            const messages = await adminSellerMessage.find({
                $or: [
                    {
                        $and: [{
                            receverId: { $eq: receverId }
                        }, {
                            senderId: {
                                $eq: id
                            }
                        }]
                    },
                    {
                        $and: [{
                            receverId: { $eq: id }
                        }, {
                            senderId: {
                                $eq: receverId
                            }
                        }]
                    }
                ]
            })
            let currentSeller = {}
            if (receverId) {
                currentSeller = await sellerModel.findById(receverId)
            }
            responseReturn(res, 200, { messages, currentSeller })
        } catch (error) {
            console.log(error)
        }
    }

    get_seller_messages = async (req, res) => {

        const receverId = ""
        const { id } = req
        try {
            const messages = await adminSellerMessage.find({
                $or: [
                    {
                        $and: [{
                            receverId: { $eq: receverId }
                        }, {
                            senderId: {
                                $eq: id
                            }
                        }]
                    },
                    {
                        $and: [{
                            receverId: { $eq: id }
                        }, {
                            senderId: {
                                $eq: receverId
                            }
                        }]
                    }
                ]
            })
            responseReturn(res, 200, { messages })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new chatController()