import io from 'socket.io-client'
export const overrideStyle = {
    display: 'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: "center"
}

export const socket = io('http://localhost:5000')