import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-seller/${sellerId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/seller-status-update`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_active_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_deactive_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url } } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true })
            window.location.href = url
           // return fulfillWithValue(data)
        } catch (error) {
            //return rejectWithValue(error.response.data)
        }
    }
)

export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async (activeCode, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {}, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)





export const sellerReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [get_seller_request.fulfilled]: (state, { payload }) => {
            state.sellers = payload.sellers
            state.totalSeller = payload.totalSeller
        },
        [get_seller.fulfilled]: (state, { payload }) => {
            state.seller = payload.seller
        },
        [seller_status_update.fulfilled]: (state, { payload }) => {
            state.seller = payload.seller
            state.successMessage = payload.message
        },
        [get_active_sellers.fulfilled]: (state, { payload }) => {
            state.sellers = payload.sellers
            state.totalSeller = payload.totalSeller
        },
        [active_stripe_connect_account.pending]: (state, { payload }) => {
            state.loader = true
        },
        [active_stripe_connect_account.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [active_stripe_connect_account.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
    }

})
export const { messageClear } = sellerReducer.actions
export default sellerReducer.reducer