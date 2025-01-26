import io from 'socket.io-client'
const overrideStyle = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: "center"
}


const production = 'production'
const dev = 'development'

const mode = production

let app_url, api_url

if (mode === production) {
    app_url = "https://dashboard-ecommerce-two.vercel.app"
    api_url = "https://api-ecommerce-fos4.onrender.com"
} else {
    app_url = 'http://localhost:3001'
    api_url = 'http://localhost:5000'
}

const socket = io(api_url)

export {
    socket,
    app_url,
    api_url,
    overrideStyle
}