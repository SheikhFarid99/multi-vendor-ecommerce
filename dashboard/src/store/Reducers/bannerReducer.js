import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const add_banner = createAsyncThunk(
    'banner/add_banner',
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post('/banner/add', info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const update_banner = createAsyncThunk(
    'banner/update_banner',
    async ({ bannerId, info }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.put(`/banner/update/${bannerId}`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_banner = createAsyncThunk(
    'banner/get_banner',
    async (productId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/banner/get/${productId}`, { withCredentials: true })
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