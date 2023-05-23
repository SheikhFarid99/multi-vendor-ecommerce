import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/admin-login', info, { withCredentials: true })
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/seller-login', info, { withCredentials: true })
            console.log(data)
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(info)
            const { data } = await api.post('/seller-register', info, { withCredentials: true })
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [admin_login.pending]: (state, _) => {
            state.loader = true
        },
        [admin_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [admin_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [seller_login.pending]: (state, _) => {
            state.loader = true
        },
        [seller_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [seller_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [seller_register.pending]: (state, _) => {
            state.loader = true
        },
        [seller_register.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [seller_register.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        }
    }

})
export const { messageClear } = authReducer.actions
export default authReducer.reducer