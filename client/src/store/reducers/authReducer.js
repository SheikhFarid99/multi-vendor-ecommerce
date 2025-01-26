import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import jwt from 'jwt-decode'
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-login', info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const decodeToken = (token) => {
    if (token) {
        const userInfo = jwt(token)
        return userInfo
    } else {
        return ''
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: decodeToken(localStorage.getItem('customerToken')),
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        user_reset: (state, _) => {
            state.userInfo = ""
        }
    },
    extraReducers: {
        [customer_register.pending]: (state, _) => {
            state.loader = true
        },
        [customer_register.rejected]: (state, { payload }) => {
            state.errorMessage = payload.error
            state.loader = false
        },
        [customer_register.fulfilled]: (state, { payload }) => {
            const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message
            state.loader = false
            state.userInfo = userInfo
        },
        [customer_login.pending]: (state, _) => {
            state.loader = true
        },
        [customer_login.rejected]: (state, { payload }) => {
            state.errorMessage = payload.error
            state.loader = false
        },
        [customer_login.fulfilled]: (state, { payload }) => {
            const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message
            state.loader = false
            state.userInfo = userInfo
        },
    }
})

export const { messageClear, user_reset } = authReducer.actions
export default authReducer.reducer