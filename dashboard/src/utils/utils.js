import io from 'socket.io-client'
const overrideStyle = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: "center"
}


const production = 'production'
const dev = production

const mode = dev

let app_url, api_url

if (mode === production) {
    app_url = ""
    api_url = ""
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