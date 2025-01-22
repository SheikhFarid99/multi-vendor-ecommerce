import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { api_url } from '../../utils/utils'

export const get_seller_payemt_details = createAsyncThunk(
    'payment/get_seller_payemt_details',
    async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/payment/seller-payment-details/${sellerId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const send_withdrowal_request = createAsyncThunk(
    'payment/send_withdrowal_request',
    async (info, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${api_url}/api/payment/withdrowal-request`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_payment_request = createAsyncThunk(
    'payment/get_payment_request',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/payment/request`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const confirm_payment_request = createAsyncThunk(
    'payment/confirm_payment_request',
    async (paymentId, { rejectWithValue, fulfillWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${api_url}/api/payment/request-confirm`, { paymentId }, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const PaymentReducer = createSlice({
    name: 'payment',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        pendingWithdrows: [],
        successWithdrows: [],
        totalAmount: 0,
        withdrowAmount: 0,
        pendingAmount: 0,
        availableAmount: 0

    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {

        [get_seller_payemt_details.fulfilled]: (state, { payload }) => {
            state.pendingWithdrows = payload.pendingWithdrows
            state.successWithdrows = payload.successWithdrows
            state.totalAmount = payload.totalAmount
            state.availableAmount = payload.availableAmount
            state.withdrowAmount = payload.withdrowAmount
            state.pendingAmount = payload.pendingAmount
        },
        [send_withdrowal_request.pending]: (state, _) => {
            state.loader = true
        },
        [send_withdrowal_request.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [send_withdrowal_request.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.pendingWithdrows = [...state.pendingWithdrows, payload.withdrowal]
            state.availableAmount = state.availableAmount - payload.withdrowal.amount
            state.pendingAmount = payload.withdrowal.amount
        },
        [get_payment_request.fulfilled]: (state, { payload }) => {

            state.pendingWithdrows = payload.withdrowalRequest
        },

        [confirm_payment_request.pending]: (state, _) => {
            state.loader = true
        },
        [confirm_payment_request.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [confirm_payment_request.fulfilled]: (state, { payload }) => {
            const temp = state.pendingWithdrows.filter(r => r._id !== payload.payment._id)
            state.loader = false
            state.successMessage = payload.message
            state.pendingWithdrows = temp
        }

    }

})
export const { messageClear } = PaymentReducer.actions
export default PaymentReducer.reducer