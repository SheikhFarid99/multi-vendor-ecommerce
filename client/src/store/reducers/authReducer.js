import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

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

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: "",
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
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
        [customer_register.fulfilled]: (state, payload) => {
            state.successMessage = payload.message
            state.loader = false
        },
    }
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer