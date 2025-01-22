import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { api_url } from '../../utils/utils'

export const get_admin_orders = createAsyncThunk(
    'order/get_admin_orders',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {

        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.get(`${api_url}/api/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_orders = createAsyncThunk(
    'order/get_seller_orders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {

        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_admin_order = createAsyncThunk(
    'order/get_admin_order',
    async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {

        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/admin/order/${orderId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_order = createAsyncThunk(
    'order/get_seller_order',
    async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {

        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/seller/order/${orderId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const admin_order_status_update = createAsyncThunk(
    'order/admin_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.put(`${api_url}/api/admin/order-status/update/${orderId}`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'order/seller_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue, getState }) => {

        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.put(`${api_url}/api/seller/order-status/update/${orderId}`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const OrderReducer = createSlice({
    name: 'order',
    initialState: {
        successMessage: '',
        errorMessage: '',
        totalOrder: 0,
        order: {},
        myOrders: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [get_admin_orders.fulfilled]: (state, { payload }) => {
            state.myOrders = payload.orders
            state.totalOrder = payload.totalOrder
        },
        [get_admin_order.fulfilled]: (state, { payload }) => {
            state.order = payload.order
        },
        [admin_order_status_update.rejected]: (state, { payload }) => {
            state.errorMessage = payload.message
        },
        [admin_order_status_update.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
        [get_seller_orders.fulfilled]: (state, { payload }) => {
            state.myOrders = payload.orders
            state.totalOrder = payload.totalOrder
        },
        [get_seller_order.fulfilled]: (state, { payload }) => {
            state.order = payload.order
        },
        [seller_order_status_update.rejected]: (state, { payload }) => {
            state.errorMessage = payload.message
        },
        [seller_order_status_update.fulfilled]: (state, { payload }) => {
            state.successMessage = payload.message
        },
    }

})
export const { messageClear } = OrderReducer.actions
export default OrderReducer.reducer