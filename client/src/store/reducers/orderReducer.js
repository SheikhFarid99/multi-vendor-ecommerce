import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import api from '../../api/api'

export const place_order = createAsyncThunk(
    'order/place_order',
    async ({
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items
    }) => {
        try {
            const {
                data
            } = await api.post('/home/order/palce-order', {
                price,
                products,
                shipping_fee,
                shippingInfo,
                userId,
                navigate,
                items,
            })
            navigate('/payment', {
                state: {
                    price: price + shipping_fee,
                    items,
                    orderId: data.orderId
                }
            })
            console.log(data)
            return true
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_orders = createAsyncThunk(
    'order/get_orders',
    async ({
        customerId,
        status
    }, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/customer/gat-orders/${customerId}/${status}`)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        myOrders: [],
        errorMessage: '',
        successMessage: '',
        myOrder: {}
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [get_orders.fulfilled] : (state,{payload})=>{
            state.myOrders = payload.orders
        }
    }
})

export const {
    messageClear
} = orderReducer.actions
export default orderReducer.reducer