import authReducer from './Reducers/authReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'
import sellerReducer from './Reducers/sellerReducer'
import chatReducer from './Reducers/chatReducer'
const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer
}
export default rootReducer