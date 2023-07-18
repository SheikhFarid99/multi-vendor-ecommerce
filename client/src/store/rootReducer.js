import homeReducer from './reducers/homeReducer'
import authReducer from './reducers/authReducer'
import cardReducer from './reducers/cardReducer'
import orderReducer from './reducers/orderReducer'
import dashboardReducer from './reducers/dashboardReducer'
const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order : orderReducer,
    dashboard : dashboardReducer
}
export default rootReducers