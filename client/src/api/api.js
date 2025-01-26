import axios from 'axios'
import { api_url } from '../utils/config'
const api = axios.create({
    baseURL: `${api_url}/api`,
})
export default api