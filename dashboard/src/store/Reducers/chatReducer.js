import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async (customerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




export const chatReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        customers: [],
        messages: [],
        activeCustomer: [],
        activeSeller: [],
        messageNotification: [],
        activeAdmin: "",
        friends: [],
        seller_admin_message: [],
        currentSeller: {},
        currentCustomer: {}
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {

        [get_customers.fulfilled]: (state, { payload }) => {
            state.customers = payload.customers
        },
        [get_customers.fulfilled]: (state, { payload }) => {
            state.customers = payload.customers
        }
    }

})
export const { messageClear } = chatReducer.actions
export default chatReducer.reducer