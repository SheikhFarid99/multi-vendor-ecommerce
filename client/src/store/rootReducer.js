import homeReducer from './reducers/homeReducer'
import authReducer from './reducers/authReducer'
import cardReducer from './reducers/cardReducer'
const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer
}
export default rootReducers