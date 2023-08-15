const express = require('express')
const {
    dbConnect
} = require('./utiles/db')
const app = express()
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const socket = require('socket.io')

const server = http.createServer(app)

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})


var allCustomer = []
var allSeller = []

const addUser = (customerId, socketId, userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({
            customerId,
            socketId,
            userInfo
        })
    }
}


const addSeller = (sellerId, socketId, userInfo) => {
    const chaeckSeller = allSeller.some(u => u.sellerId === sellerId)
    if (!chaeckSeller) {
        allSeller.push({
            sellerId,
            socketId,
            userInfo
        })
    }
}


io.on('connection', (soc) => {
    console.log('socket server is connected...')

    soc.on('add_user', (customerId, userInfo) => {
        addUser(customerId, soc.id, userInfo)
        // console.log(allCustomer)
    })
    soc.on('add_seller', (sellerId, userInfo) => {
        addSeller(sellerId, userInfo)
        //addUser(sellerID, soc.id, userInfo)
        // console.log(allCustomer)
    })
})

app.use(bodyParser.json())
app.use(cookieParser())


app.use('/api', require('./routes/chatRoutes'))

app.use('/api/home', require('./routes/home/homeRoutes'))
app.use('/api/home', require('./routes/order/orderRoutes'))
app.use('/api', require('./routes/home/cardRoutes'))
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/home/customerAuthRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.get('/', (req, res) => res.send('Hello World!'))
const port = process.env.PORT
dbConnect()
server.listen(port, () => console.log(`Server is running on port ${port}!`))