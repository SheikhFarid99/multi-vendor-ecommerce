import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export default store;