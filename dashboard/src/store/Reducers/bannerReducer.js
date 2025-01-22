import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {api_url} from '../../utils/utils'

export const add_banner = createAsyncThunk(
    'banner/add_banner',
    async (info, { fulfillWithValue, rejectWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${api_url}/api/banner/add`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const update_banner = createAsyncThunk(
    'banner/update_banner',
    async ({ bannerId, info }, { fulfillWithValue, rejectWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.put(`${api_url}/api/banner/update/${bannerId}`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_banner = createAsyncThunk(
    'banner/get_banner',
    async (productId, { fulfillWithValue, rejectWithValue, getState }) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${api_url}/api/banner/get/${productId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const bannerReducer = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        banners: [],
        banner: ""
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: {
        [add_banner.pending]: (state, _) => {
            state.loader = true
        },
        [add_banner.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [add_banner.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.banner = payload.banner
        },
        [get_banner.fulfilled]: (state, { payload }) => {
            state.banner = payload.banner
        },
        [update_banner.pending]: (state, _) => {
            state.loader = true
        },
        [update_banner.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.message
        },
        [update_banner.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
            state.banner = payload.banner
        },
    }

})
export const { messageClear } = bannerReducer.actions
export default bannerReducer.reducer