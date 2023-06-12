import axios from 'axios'
const local = 'http://localhost:5000'
const production = ''
const api = axios.create({
    baseURL: `${local}/api`
})
export default api