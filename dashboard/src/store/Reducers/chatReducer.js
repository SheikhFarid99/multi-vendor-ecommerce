import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { api_url } from '../../utils/utils'

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/chat/seller/get-customers/${sellerId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async (customerId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/chat/seller/get-customer-message/${customerId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${api_url}/api/chat/seller/send-message-to-customer`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_sellers = createAsyncThunk(
    'chat/get_sellers',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/chat/admin/get-sellers`, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const send_message_seller_admin = createAsyncThunk(
    'chat/send_message_seller_admin',
    async (info, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${api_url}/api/chat/message-send-seller-admin`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_admin_message = createAsyncThunk(
    'chat/get_admin_message',
    async (receverId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/chat/get-admin-messages/${receverId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_message = createAsyncThunk(
    'chat/get_seller_message',
    async (receverId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/chat/get-seller-messages`, config)
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
        activeSellers: [],
        messageNotification: [],
        activeAdmin: "",
        friends: [],
        seller_admin_message: [],
        currentSeller: {},
        currentCustomer: {},
        sellers: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        updateMessage: (state, { payload }) => {
            state.messages = [...state.messages, payload]
        },
        updateCustomer: (state, { payload }) => {
            state.activeCustomer = payload
        },
        updateSellers: (state, { payload }) => {
            state.activeSellers = payload
        },
        updateAdminMessage: (state, { payload }) => {
            state.seller_admin_message = [...state.seller_admin_message, payload]
        },
        updateSellerMessage: (state, { payload }) => {
            state.seller_admin_message = [...state.seller_admin_message, payload]
        },
        activeStatus_update: (state, { payload }) => {
            state.activeAdmin = payload.status
        }
    },
    extraReducers: {

        [get_customers.fulfilled]: (state, { payload }) => {
            state.customers = payload.customers
        },
        [get_customer_message.fulfilled]: (state, { payload }) => {
            state.messages = payload.messages
            state.currentCustomer = payload.currentCustomer
        },
        [send_message.fulfilled]: (state, { payload }) => {
            let tempFriends = state.customers
            let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
            while (index > 0) {
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
            }
            state.customers = tempFriends
            state.messages = [...state.messages, payload.message]
            state.successMessage = ' message send success'
        },
        [get_sellers.fulfilled]: (state, { payload }) => {
            state.sellers = payload.sellers
        },
        [send_message_seller_admin.fulfilled]: (state, { payload }) => {
            state.seller_admin_message = [...state.seller_admin_message, payload.message]
            state.successMessage = 'message send success'
        },
        [get_admin_message.fulfilled]: (state, { payload }) => {
            state.seller_admin_message = payload.messages
            state.currentSeller = payload.currentSeller
        },
        [get_seller_message.fulfilled]: (state, { payload }) => {
            state.seller_admin_message = payload.messages
        },
    }

})
export const { messageClear, updateMessage, updateCustomer, updateSellers, updateAdminMessage, updateSellerMessage, activeStatus_update } = chatReducer.actions
export default chatReducer.reducer